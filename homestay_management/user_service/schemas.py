from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserSchema(UserBase):
    id: int
    created_at: str
    
    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str
