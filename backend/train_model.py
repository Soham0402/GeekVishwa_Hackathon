import joblib
import numpy as np
from sklearn.linear_model import LinearRegression

# ✅ Sample AI/ML Model (Linear Regression for Crop Yield Prediction)
X_train = np.array([[20, 30, 1], [25, 40, 2], [30, 50, 1], [35, 60, 2]])  # [Weather, Soil Moisture, Location]
y_train = np.array([10, 15, 18, 22])  # Crop Yield (Tons)

model = LinearRegression()
model.fit(X_train, y_train)

# ✅ Save the model as 'model.pkl'
joblib.dump(model, "./models/model.pkl")

print("✅ Model trained and saved as 'model.pkl'")
