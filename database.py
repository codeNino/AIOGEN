import urllib
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import Config

database = "AIOGEN"

params = urllib.parse.quote_plus('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+Config.SERVER+
            ';DATABASE='+database+';UID='+Config.USERNAME+
            ';PWD='+ Config.PASSWORD)

Base = declarative_base()
engine = create_engine("mssql+pyodbc://?odbc_connect=%s" % params)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

