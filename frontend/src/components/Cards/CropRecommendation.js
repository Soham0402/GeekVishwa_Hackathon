import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./CropRecommendation.css";

const backgroundStyle = {
  backgroundImage: "url('/images/background.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  width: "100%",
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const FormSection = styled.div`
  width: 45%;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const ResultSection = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

/* ✅ New Styled Box for Prediction with Three Crops */
const PredictionBox = styled.div`
  background: #d4edda; /* Light green effect */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 128, 0, 0.3);
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

/* ✅ Styled container for three crops inside the PredictionBox */
const CropList = styled.div`
  display: flex;
  flex-direction: column;  /* ✅ Vertically aligned crops */
  align-items: center;
  gap: 15px; /* ✅ Space between crops */
`;

/* ✅ Styled Crop Item */
const CropItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: ${({ label }) =>
    label === "Best" ? "#4CAF50" : label === "Better" ? "#FFC107" : "#FF5722"};
  color: white;
  padding: 10px;
  border-radius: 10px;
  width: 90%;
  justify-content: center;
  text-align: center;
`;

/* ✅ Input Styles */
const InputContainer = styled.div`
  display: flex; 
  justify-content: space-between; 
  flex-wrap: wrap;  /* Allows wrapping if screen is small */
  width: 100%;
`;

const Input = styled.input`
  flex: 1; /* ✅ Adjust width automatically */
  min-width: 120px; /* ✅ Ensures consistency */
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: green;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background: darkgreen;
  }
`;

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    pH: "",
    rainfall: "",
  });
  
  const [recommendedCrops, setRecommendedCrops] = useState([]);

  useEffect(() => {
    if (formData.city) {
      fetch(`http://127.0.0.1:5000/weather?location=${formData.city}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Weather API Response:", data); // ✅ Debugging output
          if (!data.error) {
            setFormData((prevData) => ({
              ...prevData,
              temperature: data.temperature.toFixed(2), // ✅ Ensure only 2 decimal places
              humidity: data.humidity.toFixed(2),
            }));
          }
        })
        .catch((err) => console.error("Weather API Error:", err));
    }
  }, [formData.city]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending request:", JSON.stringify(formData));

    try {
      const response = await fetch("http://127.0.0.1:5000/predict1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nitrogen: Number(formData.nitrogen),
          phosphorus: Number(formData.phosphorus),
          potassium: Number(formData.potassium),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          pH: Number(formData.pH),
          rainfall: Number(formData.rainfall),
        }),
      });

      const data = await response.json();
      console.log("Received response:", data);
      if (data.top_crops && Array.isArray(data.top_crops)) {
        setRecommendedCrops(data.top_crops);
      } else {
        setRecommendedCrops([]); // Handle case where no crops are returned
      }
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };
  
  return (
    <div style={backgroundStyle}>
      <Container>
        <FormSection>
          <h2>Crop Recommendation System</h2>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              {Object.keys(formData).map((key, index) => (
                <div key={index} style={{ width: "48%" }}>
                  <label><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b></label>
                  <Input
                    type={key === "city" || key === "state" ? "text" : "number"}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder={`Enter ${key}`}
                    required={key !== "temperature" && key !== "humidity"}
                    disabled={key === "temperature" || key === "humidity"} // ✅ Ensure these are visible but uneditable
                  />
                </div>
              ))}
            </InputContainer>
            <Button type="submit">Predict Crop</Button>
          </form>
        </FormSection>

        <ResultSection>
          {recommendedCrops.length > 0 && (
            <PredictionBox>
              <h3>🌱 Recommended Crops</h3>
              <CropList>
                {recommendedCrops.map((crop, index) => (
                  <CropItem key={index} label={crop.label}>
                    <img
                      src={`/images/${crop.name.toLowerCase()}.jpg`}
                      alt={crop.name}
                      className="crop-image"
                      onError={(e) => (e.target.src = "/images/default.jpg")}
                      style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                    />
                    <div>
                      <h4>{crop.label} Crop: {crop.name}</h4>
                      <p>Confidence: {crop.confidence.toFixed(2)}%</p>
                    </div>
                  </CropItem>
                ))}
              </CropList>
            </PredictionBox>
          )}
        </ResultSection>
      </Container>
    </div>
  );
};

export default CropRecommendation;
