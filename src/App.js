import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [isp, setIsp] = useState("");
  const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&domain=example.com`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);
        setLocation(data.location);
      });
  });

  return (
    <div className="App">
      <div>{ip}</div>
      <div>
        {location.city}, {location.region}, {location.timezone}
      </div>
    </div>
  );
}

export default App;
