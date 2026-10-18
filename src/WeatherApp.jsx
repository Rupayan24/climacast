import { useState } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Kolkata",
    feelsLike: 40.33,
    humidity: 61,
    temp: 33.33,
    tempMax: 33.33,
    tempMin: 33.33,
    weather: "scattered clouds",
  });

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <main className="weather-app">
      <header className="app-header">
        <span className="app-kicker">YOUR DAILY FORECAST</span>
        <h1>Weather, wherever you are.</h1>
        <p className="app-subtitle">
          A little sunshine, rain, or whatever the day has in store.
        </p>
      </header>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
      <footer className="app-footer">A clearer look at your day.</footer>
    </main>
  );
}
