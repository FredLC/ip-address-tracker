import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&domain=example.com`;
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [isp, setIsp] = useState("");

  const getApiData = async () => {
    try {
      const ipData = await axios.get(apiUrl);
      setIp(ipData.data.ip);
      setLocation(ipData.data.location);
      setIsp(ipData.data.isp);
      console.log(ipData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="App">
      <div>{ip}</div>
      <div>
        {location.city}, {location.region}, {location.timezone}
      </div>
      <MapContainer
        id="map"
        center={[location.lat, location.lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
