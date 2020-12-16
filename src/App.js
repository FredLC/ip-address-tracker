import { useEffect, useState } from "react";
import axios from "axios";
import Map from "./Map";
import "./App.css";

function App() {
  const [address, setAddress] = useState("");
  const [userAuthorization, setUserAuthorization] = useState(false);
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [isp, setIsp] = useState("");
  const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&domain=${address}`;

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      setUserAuthorization(true);
      fetch("https://api.ipify.org/?format=json")
        .then((res) => res.json())
        .then((data) => setAddress(data.ip));
    } else {
      setUserAuthorization(false);
    }
  };

  const handleUserInput = (e) => {
    setAddress(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getApiData();
    }
  };

  const getApiData = async () => {
    try {
      const ipData = await axios.get(apiUrl);
      setIp(ipData.data.ip);
      setLocation(ipData.data.location);
      setIsp(ipData.data.isp);
    } catch (err) {
      alert(
        "Please enter a valid IP address or domain name. e.g 93.184.216.34 or example.com"
      );
    }
  };

  useEffect(() => {
    getUserPosition();
    getApiData();
  }, []);

  return (
    <div
      className="App"
      style={{
        background: `url('${process.env.PUBLIC_URL}/img/pattern-bg.png')`,
      }}
    >
      {userAuthorization ? (
        <div>
          <h1>IP Address Tracker</h1>
          <div className="search">
            <input
              onChange={handleUserInput}
              onKeyPress={handleKeyPress}
              type="text"
              placeholder="Search for any IP address or domain"
            />
            <button onClick={getApiData}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="ipInfoContainer">
            <div className="ipInfo">
              <p className="infoLabel">IP ADDRESS</p>
              <p className="info">{ip}</p>
            </div>
            <div className="separator"></div>
            <div className="ipInfo">
              <p className="infoLabel">LOCATION</p>
              <p className="info">
                {location.city + ", "} {location.region}
              </p>
            </div>
            <div className="separator"></div>
            <div className="ipInfo">
              <p className="infoLabel">TIMEZONE</p>
              <p className="info">UTC {location.timezone}</p>
            </div>
            <div className="separator"></div>
            <div className="ipInfo">
              <p className="infoLabel">ISP</p>
              <p className="info">{isp}</p>
            </div>
          </div>
          <Map
            center={[
              location.lat ? location.lat : 51.505,
              location.lng ? location.lng : -0.09,
            ]}
          />
        </div>
      ) : (
        <div>Please turn on location in your browser's privacy settings.</div>
      )}
    </div>
  );
}

export default App;
