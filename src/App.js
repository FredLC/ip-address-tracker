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
      console.log("Available");
      fetch("https://api.ipify.org/?format=json")
        .then((res) => res.json())
        .then((data) => setAddress(data.ip));
    } else {
      setUserAuthorization(false);
      console.log("Not Available");
    }
  };

  const handleUserInput = (e) => {
    setAddress(e.target.value);
  };

  const getApiData = async () => {
    try {
      const ipData = await axios.get(apiUrl);
      setIp(ipData.data.ip);
      setLocation(ipData.data.location);
      setIsp(ipData.data.isp);
      console.log(ipData);
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
    <div className="App">
      {userAuthorization ? (
        <div>
          <h1>IP Address Tracker</h1>
          <input
            onChange={handleUserInput}
            type="text"
            placeholder="Search for any IP address or domain"
          />
          <button onClick={getApiData}>SEARCH</button>
          <div>{ip}</div>
          <div>
            {location.city}, {location.region}, {location.timezone}, {isp}
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
