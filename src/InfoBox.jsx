import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";
import SurfingOutlinedIcon from "@mui/icons-material/SurfingOutlined";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";

const HOT_URL =
  "https://images.unsplash.com/photo-1491929007750-dce8ba76e610?q=80&w=1167&auto=format&fit=crop";
const COLD_URL =
  "https://plus.unsplash.com/premium_photo-1670493556860-13e006e6faa4?q=80&w=997&auto=format&fit=crop";
const RAIN_URL =
  "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1000&auto=format&fit=crop";

export default function InfoBox({ info }) {
  const isRainy = info.humidity > 80;
  const isWarm = info.temp > 15;
  const backgroundImage = isRainy ? RAIN_URL : isWarm ? HOT_URL : COLD_URL;
  const WeatherIcon = isRainy
    ? ThunderstormOutlinedIcon
    : isWarm
      ? SurfingOutlinedIcon
      : AcUnitOutlinedIcon;

  return (
    <section className="InfoBox" aria-label={`Current weather in ${info.city}`}>
      <Card className="weather-card" elevation={0}>
        <CardMedia
          className="weather-hero"
          image={backgroundImage}
          title={`${info.weather} in ${info.city}`}
        >
          <div className="weather-hero-content">
            <div className="weather-location">
              <span className="weather-eyebrow">CURRENT WEATHER</span>
              <Typography component="h2" className="weather-city">
                {info.city}
              </Typography>
              <p className="weather-condition">{info.weather}</p>
            </div>
            <div className="weather-current">
              <WeatherIcon className="weather-icon" aria-hidden="true" />
              <span className="weather-temperature">
                {Math.round(info.temp)}°
                <span className="temperature-unit">C</span>
              </span>
            </div>
          </div>
        </CardMedia>
        <CardContent className="weather-details">
          <p className="details-heading">Today&apos;s highlights</p>
          <div className="weather-stats">
            <div className="weather-stat">
              <span className="stat-label">Feels like</span>
              <span className="stat-value">{Math.round(info.feelsLike)}°C</span>
            </div>
            <div className="weather-stat">
              <span className="stat-label">Humidity</span>
              <span className="stat-value">{info.humidity}%</span>
            </div>
            <div className="weather-stat">
              <span className="stat-label">Low / High</span>
              <span className="stat-value">
                {Math.floor(info.tempMin)}° / {Math.ceil(info.tempMax)}°
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
