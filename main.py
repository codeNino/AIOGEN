from fastapi import FastAPI, Request, Depends, HTTPException, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse as JR
from starlette.responses import FileResponse 
from pydantic import BaseModel
import uvicorn, sys, random, concurrent.futures
from sqlalchemy.orm import Session
import schemas, models
from database import engine, SessionLocal
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from uuid import UUID, uuid4
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters
from fastapi_sessions.backends.implementations import InMemoryBackend
from fastapi_sessions.session_verifier import SessionVerifier
from security import generate_token, validate_token

app = FastAPI()
app.mount("/build", StaticFiles(directory="build"), name="static")

schemas.Base.metadata.create_all(engine)

class SessionData(BaseModel):
    email: str

cookie_params = CookieParameters()

# Uses UUID
cookie = SessionCookie(
    cookie_name="cookie",
    identifier="general_verifier",
    auto_error=True,
    secret_key="DONOTUSE",
    cookie_params=cookie_params,
)
backend = InMemoryBackend[UUID, SessionData]()

class BasicVerifier(SessionVerifier[UUID, SessionData]):
    def __init__(
        self,
        *,
        identifier: str,
        auto_error: bool,
        backend: InMemoryBackend[UUID, SessionData],
        auth_http_exception: HTTPException,
    ):
        self._identifier = identifier
        self._auto_error = auto_error
        self._backend = backend
        self._auth_http_exception = auth_http_exception

    @property
    def identifier(self):
        return self._identifier

    @property
    def backend(self):
        return self._backend

    @property
    def auto_error(self):
        return self._auto_error

    @property
    def auth_http_exception(self):
        return self._auth_http_exception

    def verify_session(self, model: SessionData) -> bool:
        """If the session exists, it is valid"""
        return True


verifier = BasicVerifier(
    identifier="general_verifier",
    auto_error=True,
    backend=backend,
    auth_http_exception=HTTPException(status_code=403, detail="invalid session"),
)

origins = ["http://localhost:3000/", "http://127.0.0.1:8000/"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/api')
def index():
    return FileResponse('./public/index.html')


@app.post('/api/signup')
async def register(request: Request, db: Session= Depends(get_db)):
    data = await request.json()
    email = data["email"].lower()
    name = data["name"].lower()
    passwd = data["password"].lower()
    try:
        existing_user = db.query(schemas.User).filter(schemas.User.email == email).first()
        if not existing_user:            
            user = models.User(email=email, fullname=name, admin= False)
            user.password = models.User.set_password(passwd)
            db_user = schemas.User(email= user.email, hashed_password= user.password,
                fullname= user.fullname, created_on = datetime.now(), admin = user.admin
               )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return JR(
                status_code=200,
                content={"status_code": 200, "message": "User Successfully Registered"})
        else:
            raise HTTPException(status_code=402, detail="Email already registered")
    except SQLAlchemyError as ex:
        sqlstate = ex.args[0]
        print(sqlstate)


@app.post("/api/login")
async def signin(request: Request, response: Response, db: Session= Depends(get_db)):
    data = await request.json()
    email = data["email"].lower()
    passwd = data["password"].lower()
    try:
        existing_user = db.query(schemas.User).filter(schemas.User.email == email).first()
        if existing_user:
            if  models.User.check_password(existing_user.hashed_password, passwd):
                existing_user.last_login = datetime.now()
                token = generate_token(email)
                session = uuid4()
                data = SessionData(email=email)
                await backend.create(session, data)
                cookie.attach_to_response(response, session)     
                db.commit()
                return JR(
                    status_code= 200,
                    content={"message": "Authenticated", "token": token})
            else:
                raise HTTPException(status_code=402, detail="Invalid Authentication Credentials")   
        else:
            raise HTTPException(status_code=404, detail="Account Does Not Exist")

    except SQLAlchemyError as ex:
        sqlstate = ex.args[0]
        print(sqlstate)

@app.post("/api/generate", dependencies=[Depends(validate_token)])
async def generate(request: Request, db: Session= Depends(get_db)):

    def generate_accounts(account_type, email, proxy_list, url, sms_token, username, number_of_accounts):
        accounts = []
        try:
            Proxy = random.choice(proxy_list)
            if account_type == 'google':
                from GmailApi import gmail_api
                with concurrent.futures.ProcessPoolExecutor() as executor:
                    results = [executor.submit(gmail_api, email, Proxy, sms_token, url, username) for _ in range(number_of_accounts)]
                    for f in concurrent.futures.as_completed(results):
                        username, password = f.result()
                        assert (username != 'INVALID PROXY' or password != 'INVALID PROXY')
                        accounts.append((username, password))
            else:
                if account_type == "nike":
                    from NikeApi import nike_api
                    api = nike_api
                elif account_type == "adidas":
                    from AdidasApi import adidas_api
                    api = adidas_api
                with concurrent.futures.ProcessPoolExecutor() as executor:
                    results = [executor.submit(api, Proxy, url, username) for _ in range(number_of_accounts)]
                    for f in concurrent.futures.as_completed(results):
                        username, password = f.result()
                        assert (username != 'INVALID PROXY' or password != 'INVALID PROXY')
                        accounts.append((username, password))
            return {"status_code": 200, "data": accounts}      
        except AssertionError:
            return {"status_code": 400, "detail": "No accounts created! INVALID PROXY INPUT"}     
        except Exception as e:
            return  {"status_code" : 404,
                        "detail" : f"{str(e)}"}

    data = await request.json()
    account, email, no_of_accounts,  = data["account"], data["email"], data["quantity"]
    user_id = list(backend.data.values())[0].email
    print(user_id)    
    user = db.query(schemas.User).filter(schemas.User.email == user_id).first()
    print(user.fullname)    
    proxy = user.proxy
    sms_token = user.sms_token
    url = user.webhook_url
    user_name = user.webhook_username
    while not proxy or not sms_token or not url or not user_name:
        return JR(
                status_code= 405,
                content={"message": "PROXY, SMS-TOKEN, DISCORD WEBHOOK AND USERNAME REQUIRED IN SETTINGS"})
    else:
        pass
    proxy_list = proxy.split(",")
    response = generate_accounts(account, email, proxy_list, url, sms_token, user_name, no_of_accounts)
    if response["status_code"] == 200:
        return JR(
                status_code=200,
                content=response)
    else:
        raise HTTPException(
                    status_code= response["status_code"],
                    detail= response["detail"])


@app.post("/api/settings", dependencies=[Depends(validate_token)])
async def settings(request: Request, db: Session= Depends(get_db)):
    data = await request.json()
    proxy, sms  = data["proxy"], data["sms_token"]
    url, username = data["discord_webhook_url"], data["discord_username"]
    user_id = list(backend.data.values())[0].email
    print(user_id)
    user = db.query(schemas.User).filter(schemas.User.email == user_id).first()
    print(user.fullname) 
    user.proxy,  user.sms_token = proxy, sms
    user.webhook_url, user.webhook_username = url, username
    db.commit() 
    return JR(
            status_code=200,
            content={"message": "Settings Saved"}) 

@app.post("/api/logout", dependencies=[Depends(validate_token)])
async def Logout(request: Request, response: Response):
    button = await request.json()
    if button["logout"] == True:
        print("Logging out.....")
        session_id = list(backend.data.keys())[0]
        await backend.delete(session_id)
        cookie.delete_from_response(response)
        print("Session ended")
    else:
        pass                             

if __name__ == '__main__':
    uvicorn.run("main:app", host="127.0.0.1", reload=True, port=8000)
        