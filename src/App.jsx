import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const API_KEY = "160a66f8ec5f1ddfef75dbb5e8492f44";

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);

      // Update the date and day
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(now.toLocaleDateString(undefined, options));
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  const getWeatherIcon = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather} style={{ padding: "10px" }}>
        Get Weather
      </button>

      {currentDate && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{currentDate}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>Weather in: {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <img
            src={getWeatherIcon(weather.weather[0].icon)}  // Use icon code
            alt={weather.weather[0].description}
            style={{ width: "100px", height: "100px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
