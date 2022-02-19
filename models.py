from werkzeug.security import generate_password_hash, check_password_hash
from pydantic import BaseModel

class User(BaseModel):

    email: str
    fullname: str
    admin: bool
    password: str

    @staticmethod
    def set_password(password):
        """Create hashed password."""
        return generate_password_hash(
            password,
            method='sha256'
        )
    @staticmethod
    def check_password(hashed_password, password):
        """Check hashed password."""
        return check_password_hash(hashed_password, password)