from flask import Flask, request, jsonify
from database import SessionLocal, engine
from models import Base, UserModel
from schemas import UserCreate, UserSchema
from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.route('/auth/register', methods=['POST'])
def register_user():
    db: Session = next(get_db())
    data = request.get_json()
    
    # Check if user already exists
    existing_user = db.query(UserModel).filter(UserModel.email == data['email']).first()
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400
    
    # Create new user
    user_data = UserCreate(**data)
    user_data.password = generate_password_hash(user_data.password)
    user = UserModel(**user_data.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return jsonify(UserSchema.from_orm(user).dict()), 201

@app.route('/auth/login', methods=['POST'])
def login_user():
    db: Session = next(get_db())
    data = request.get_json()
    
    # Find user by email
    user = db.query(UserModel).filter(UserModel.email == data['email']).first()
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401
    
    # Check password
    if not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Invalid email or password"}), 401
    
    return jsonify(UserSchema.from_orm(user).dict()), 200

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    db: Session = next(get_db())
    user = db.query(UserModel).filter(UserModel.id == id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(UserSchema.from_orm(user).dict())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5005)
