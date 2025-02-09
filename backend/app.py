from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
import bcrypt
import joblib
import numpy as np
import requests
import pickle

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure SQLite Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a strong secret key

db = SQLAlchemy(app)
jwt = JWTManager(app)

# ✅ Load the trained model properly
try:
    model_path = "models/crop_model.pkl"  # Ensure path is correct
    model = joblib.load(model_path)  # ✅ Load trained model
    print(f"Model Loaded Successfully: {type(model)}")
except Exception as e:
    print(f"Error loading model: {e}")

# ✅ OpenWeatherMap API Key (Replace with your actual API key)
WEATHER_API_KEY = "ec9e592372c9f00927db9f1421537954"

# ✅ User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

# ✅ Create Database Tables (Automatically on App Start)
with app.app_context():
    db.create_all()
    print("Database & Tables Created!")

# ✅ User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username, email, password = data['username'], data['email'], data['password']

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({"message": "Username or Email already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = User(username=username, email=email, password=hashed_password.decode('utf-8'))

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# ✅ User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email, password = data['email'], data['password']

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        access_token = create_access_token(identity=user.id)
        return jsonify({"message": "Login successful", "token": access_token}), 200
    else:
        return jsonify({"message": "Invalid password"}), 401

# ✅ Fetch Real-Time Weather Data
@app.route("/weather", methods=["GET"])
def get_weather():
    location = request.args.get("location", "Delhi")  # Default location: Delhi
    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={WEATHER_API_KEY}&units=metric"

    try:
        response = requests.get(url).json()
        return jsonify({
            "temperature": response["main"]["temp"],
            "humidity": response["main"]["humidity"],
            "wind_speed": response["wind"]["speed"],
        })
    except:
        return jsonify({"error": "Unable to fetch weather data"}), 500
    

@app.route('/predict1', methods=['POST'])
def predict1():
    try:
        if not request.is_json:
            return jsonify({"error": "Invalid request. Expected JSON format."}), 415

        data = request.get_json()
        print("Received Data:", data)  # ✅ Debugging

        # Convert input values to float
        features = np.array([
            float(data["nitrogen"]),
            float(data["phosphorus"]),
            float(data["potassium"]),
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["pH"]),
            float(data["rainfall"]),
        ]).reshape(1, -1)

        # ✅ Ensure model is callable
        if not hasattr(model, "predict"):
            return jsonify({"error": "Loaded object is not a valid model"}), 500

        # ✅ Make prediction
        crop_prediction = model.predict(features)[0]

        return jsonify({"crop": crop_prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
