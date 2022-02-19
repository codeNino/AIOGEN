import jwt
from fastapi import Depends, HTTPException as HE
from fastapi.security import HTTPBearer
from pydantic import ValidationError
from config import Config
from typing import Union, Any
from datetime import datetime, timedelta

reusable_oauth2 = HTTPBearer(
    scheme_name='Authorization'
)


def generate_token(email: Union[str, Any]):
    expire = datetime.utcnow() + timedelta(
        days=1  # Expires after 1 day
    )
    to_encode = {
        "exp": expire, "username": email
    }
    encoded_jwt = jwt.encode(to_encode, Config.SECRET_KEY, algorithm= Config.SECURITY_ALGORITHM)
    return encoded_jwt

def validate_token(http_authorization_credentials=Depends(reusable_oauth2)):
    """
    Decode JWT token to get username =&gt; return username
    """
    try:
        payload = jwt.decode(http_authorization_credentials.credentials, Config.SECRET_KEY, algorithms=[Config.SECURITY_ALGORITHM])
        if payload.get('username') and payload.get("exp") == datetime.utcnow():
            raise HE(status_code=403, detail="Token expired")
        return payload.get('username')
    except(jwt.PyJWTError, ValidationError):
        raise HE(
            status_code=403,
            detail=f"Could not validate credentials",
        )