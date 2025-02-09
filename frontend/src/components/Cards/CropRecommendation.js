import React, { useState } from "react";
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

/* ✅ NEW: Flex container for inputs */
const InputContainer = styled.div`
  display: flex; 
  justify-content: space-between; 
  flex-wrap: wrap;  /* Allows wrapping if screen is small */
  width: 100%;
`;

/* ✅ Bold Label for Inputs */
const Label = styled.label`
  font-weight: bold;
  display: block; /* Ensures label is above input */
  margin-bottom: 5px;
`;


const ResultSection = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

/* ✅ New Styled Box for Prediction */
const PredictionBox = styled.div`
  background: #d4edda;  /* Light green effect */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 128, 0, 0.3);
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
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
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    pH: "",
    rainfall: "",
  });

  const [predictedCrop, setPredictedCrop] = useState(null);

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
      setPredictedCrop(data.crop);
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
        <InputContainer> {/* ✅ Wrap all inputs in a flex container */}
        {Object.keys(formData).map((key, index) => (
        <div key={index} style={{ width: "48%" }}> {/* ✅ Each input takes half-width */}
            <Label>{key.charAt(0).toUpperCase() + key.slice(1)}:</Label> {/* ✅ Bold label */}
            <Input
            type="number"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={`Enter ${key}`}
            required
            />
        </div>
        ))}
        </InputContainer>
        <Button type="submit">Predict Crop</Button>
        </form>
      </FormSection>

      <ResultSection>
        {predictedCrop && (
          <PredictionBox>  {/* ✅ Wrapped in Light Green Box */}
            <h3>Recommended Crop: {predictedCrop}</h3>
            <img
              src={`/images/${predictedCrop.toLowerCase()}.jpg`}
              alt={predictedCrop}
              className="crop-image"
              onError={(e) => (e.target.src = "/images/default.png")}
              style={{ width: "120px", height: "120px", borderRadius: "50%" }}  // ✅ Circular Image
            />
          </PredictionBox>
        )}
      </ResultSection>
    </Container>
    </div>
  );
};

export default CropRecommendation;
