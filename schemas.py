from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from database import Base

from datetime import datetime


class User(Base):

    __tablename__ = "Aiogen_Users"

    id_ = Column(Integer, primary_key=True,  autoincrement=True)
    email = Column(String(40), unique=True, nullable=False)
    fullname = Column(String(40), unique=False, nullable=False)
    hashed_password = Column(String(200), unique=False, nullable=False)
    created_on = Column(DateTime, index=False, unique=False,default=datetime.now())
    last_login = Column(DateTime, index=False, unique=False, nullable=True)
    proxy = Column(String(30), index=False, unique=False, nullable= True)
    sms_token = Column(String(30), index= False, nullable=True)
    webhook_url = Column(String(50), index=False, nullable=True)
    webhook_username = Column(String(20), index=False, nullable=True)
    admin = Column(Boolean, index=False, default=False)

