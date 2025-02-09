import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const IndiaCenter = [22.3511148, 78.6677428]; // 📌 Center Map on India
const zoomLevel = 5; // 📌 Optimized for India view

const MapComponent = () => {
  return (
    <section className="dashboard-section">
      <h2>🗺️ Crop Suitability Map (India Focused)</h2>
      <div className="map-container">
        <MapContainer 
          center={IndiaCenter} 
          zoom={zoomLevel} 
          className="map" 
          scrollWheelZoom={false} // 📌 Disables annoying scrolling
          dragging={true} 
          doubleClickZoom={false}
          zoomControl={true} 
          style={{ width: "100%", height: "400px" }} // ✅ Ensures proper size
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {/* ✅ Markers for Important Farming Locations */}
          <Marker position={[28.6139, 77.2090]}> {/* 📌 New Delhi */}
            <Popup>🌱 Best Crops: Wheat, Rice</Popup>
          </Marker>
          <Marker position={[19.0760, 72.8777]}> {/* 📌 Mumbai */}
            <Popup>🌱 Best Crops: Sugarcane, Cotton</Popup>
          </Marker>
          <Marker position={[13.0827, 80.2707]}> {/* 📌 Chennai */}
            <Popup>🌱 Best Crops: Rice, Millets</Popup>
          </Marker>
          <Marker position={[23.2599, 77.4126]}> {/* 📌 Bhopal */}
            <Popup>🌱 Best Crops: Soybean, Wheat</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default MapComponent;
