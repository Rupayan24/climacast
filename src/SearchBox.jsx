import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const getWeatherInfo = async (cityName) => {
    try {
      let response = await fetch(
        `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`,
      );
      let jsonResponse = await response.json();

      if (jsonResponse.cod !== 200) {
        throw new Error(jsonResponse.message);
      }

      let result = {
        city: cityName,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };

      setError(false);
      return result;
    } catch {
      setError(true);
      return null;
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let currentCity = city.trim();
    if (!currentCity) return;

    setCity("");
    let newInfo = await getWeatherInfo(currentCity);
    if (newInfo && updateInfo) {
      updateInfo(newInfo);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          className="city-input"
          label="Search a city"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
          slotProps={{ htmlInput: { "aria-label": "City name" } }}
        />
        <Button className="search-button" variant="contained" type="submit">
          Search
        </Button>
        {error && (
          <p className="search-error" role="alert">
            We couldn&apos;t find that city. Please check the spelling and try
            again.
          </p>
        )}
      </form>
    </div>
  );
}
