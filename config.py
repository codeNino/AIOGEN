import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    #DATABASE     
    SERVER = os.getenv("SQL_SERVER_NAME") + ","+ os.getenv("PORT")
    USERNAME = os.getenv("User")
    PASSWORD = os.getenv("Password")

    #SECURITY
    SECURITY_ALGORITHM = os.getenv("SEC_ALGO")
    SECRET_KEY = os.getenv("SECRET_KEY")