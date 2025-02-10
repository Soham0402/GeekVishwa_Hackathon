import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background: url('/images/background.jpg') no-repeat center center;
  background-size: cover;
`;

const FormSection = styled.div`
  width: 45%;
  background: rgba(255, 255, 255, 0.9);
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

/* ✅ NEW: Box to Hold Prediction & Suggestions */
const BigResultBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  width: 80%;
  text-align: center;
  margin-top: 20px;
`;

const PredictionBox = styled.div`
  background: #d4edda;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 128, 0, 0.3);
  font-size: 18px;
  font-weight: bold;
  width: 80%;
  margin-bottom: 15px;
`;

const SuggestionBox = styled.div`
  background: #fef3c7;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(255, 165, 0, 0.3);
  width: 80%;
  font-size: 14px;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
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
  margin-top: 10px;
  &:hover {
    background: darkgreen;
  }
`;

const LocationButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  background: orange;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: darkorange;
  }
`;

const CropYield = () => {
  const [formData, setFormData] = useState({
    crop: "Rice",
    state: "",
    area: "",
    fertilizer: "",
    pesticide: "",
    annual_rainfall: "",
    date: "",
    season: "",
    latitude: "",
    longitude: "",
  });

  const [predictedYield, setPredictedYield] = useState(null);
  const [suggestions, setSuggestions] = useState("");

  const fetchStateFromLocation = async (event) => {
    event.preventDefault();  // ✅ Prevent page refresh when button is clicked
  
    const latitude = 18.4597;  // ✅ Static Latitude (Maharashtra)
    const longitude = 73.8839; // ✅ Static Longitude (Maharashtra)
  
    console.log("Latitude:", latitude, "Longitude:", longitude);
  
    try {
      const response = await fetch("http://127.0.0.1:5000/get_state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude }),
      });
  
      const data = await response.json();
      console.log("Received State:", data.state);
  
      if (data.state) {
        setFormData((prev) => ({ ...prev, state: data.state }));
      } else {
        alert("Could not fetch state. Try again.");
      }
    } catch (error) {
      console.error("Error fetching state:", error);
    }
  };  
    
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (!selectedDate.getTime()) {
        alert("Invalid date selected!");
        return;
      }
    
      // ✅ Ensure date is formatted as YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split("T")[0];
    
      setFormData((prev) => ({
        ...prev,
        date: formattedDate, // ✅ Store in YYYY-MM-DD format
      }));
    
      console.log("Selected Date:", formattedDate);
    const month = selectedDate.getMonth() + 1;
    let season = "";

    if (month >= 6 && month <= 10) season = "Kharif";
    else if (month >= 10 || month <= 3) season = "Rabi";
    else if (month >= 9 && month <= 11) season = "Autumn";
    else if (month >= 3 && month <= 6) season = "Summer";
    else season = "Winter";

    setFormData(prev => ({ ...prev, date: e.target.value, season }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending request:", JSON.stringify(formData));

    try {
      const response = await fetch("http://127.0.0.1:5000/predict_yield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Received response:", data);
      setPredictedYield(`${data.predicted_yield} kg/ha`);
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions.join(", ") : "No suggestions available");
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };

  return (
    <Container>
      <FormSection>
        <h2>🌾 Crop Yield Prediction</h2>
        <form>
          <label>Crop:</label>
          <Select name="crop" value={formData.crop} onChange={handleChange}>
            {["Rice", "Wheat", "Maize", "Jute", "Cotton", "Groundnut", "Peas", "Sugarcane", "Tobacco", "Coconut", "Banana", "Moong"].map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </Select>

          <label>Area (ha):</label>
          <Input type="number" name="area" value={formData.area} onChange={handleChange} required />

          <label>Date:</label>
          <Input type="date" name="date" value={formData.date} onChange={handleDateChange} required />

          <label>Fertilizer (kg):</label>
          <Input type="number" name="fertilizer" value={formData.fertilizer} onChange={handleChange} required />

          <label>Pesticide (kg):</label>
          <Input type="number" name="pesticide" value={formData.pesticide} onChange={handleChange} required />

          <label>Annual Rainfall (mm):</label>
          <Input type="number" name="annual_rainfall" value={formData.annual_rainfall} onChange={handleChange} required />
          
          <label>State:</label>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Input type="text" name="state" value={formData.state} readOnly />
                <LocationButton onClick={fetchStateFromLocation}>📍 Get Location</LocationButton>
            </div>

          <Button onClick={handleSubmit}>Predict Yield</Button>
        </form>
      </FormSection>

      <ResultSection>
        {predictedYield && (
          <BigResultBox>
            <PredictionBox>🌾 Predicted Yield: {predictedYield}</PredictionBox>
            <SuggestionBox>📝 {suggestions}</SuggestionBox>
          </BigResultBox>
        )}
      </ResultSection>
    </Container>
  );
};

export default CropYield;
