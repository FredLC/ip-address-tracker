import React from "react";
import axios from "axios";
import Map from "./Map";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      userAuthorization: false,
      ip: "",
      location: {},
      isp: "",
    };
  }

  getUserPosition = () => {
    if ("geolocation" in navigator) {
      this.setState({
        userAuthorization: true,
      });
      fetch("https://api.ipify.org/?format=json")
        .then((res) => res.json())
        .then((data) => this.setState({ address: data.ip }));
    } else {
      this.setState({
        userAuthorization: false,
      });
    }
  };

  handleUserInput = (e) => {
    this.setState({ address: e.target.value });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.getApiData();
    }
  };

  getApiData = async () => {
    const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&domain=${this.state.address}`;
    try {
      const ipData = await axios.get(apiUrl);
      this.setState({
        ip: ipData.data.ip,
        location: ipData.data.location,
        isp: ipData.data.isp,
      });
    } catch (err) {
      alert(
        "Please enter a valid IP address or domain name. e.g 93.184.216.34 or example.com"
      );
    }
  };

  componentDidMount() {
    this.getUserPosition();
    this.getApiData();
  }

  render() {
    const { userAuthorization, ip, location, isp } = this.state;
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
                onChange={this.handleUserInput}
                onKeyPress={this.handleKeyPress}
                type="text"
                placeholder="Search for any IP address or domain"
              />
              <button onClick={this.getApiData}>
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
}

export default App;
