/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import SearchComponent from "./components/SearchComponent";
import WeatherCard from "./components/WeatherCard";
import getCityWeather from "./services/weatherService";
import ErrorAlert from "./components/ErrorAlert";
import { Box } from "@mui/material";
import { weatherConditions } from "./utils/backgrounds";

function App() {
  const [cityWeather, setCityWeather] = useState(null);
  const [city, setCity] = useState("buenos aires");
  const [error, setError] = useState(null);

  useEffect(() => {
    getCityWeatherService();
  }, [city]);

  const getCityWeatherService = () => {
    if (city) {
      getCityWeather(city)
        .then((response) => {
          if (response.error) {
            throw response.error;
          } else {
            setError(null);
            const [datePart, timePart] = response.location.localtime.split(" ");
            const [year, month, day] = datePart.split("-");
            let [hour, minute] = timePart.split(":");
            const formattedDate = `${day}/${month}/${year}`;
            const formattedTime = `${hour}:${minute} hs`;
            setCityWeather({
              city: response.location.name,
              country:
                response.location.region + ", " + response.location.country,
              temp: response.current.temp_c,
              condition: response.current.condition.code,
              icon: response.current.condition.icon,
              conditionText: response.current.condition.text,
              date: formattedDate,
              time: formattedTime,
            });
          }
        })
        .catch((error) => {
          console.log("catch", error);
          setError(error.message);
        });
    }
  };

  const refresh = () => {
    getCityWeatherService();
  };

  const getCity = (city) => {
    if (city) {
      setCity(city.id);
    }
  };

  const getBackgroundStyle = (conditionText) => {
    // Encuentra la URL de la imagen según el conditionText
    const condition = weatherConditions.find((condition) => condition.condition === conditionText);
    if (condition) {
      return { background: `url(${condition.imageUrl})`, backgroundSize: 'cover' };
    } else {
      return null;
    }
  };

  return (
    <div id="root" style={cityWeather ? getBackgroundStyle(cityWeather.conditionText) : null}>
      <Box p={2} style={{backgroundColor: 'black', opacity: '0.5'}}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <SearchComponent getCity={getCity} />
        </Box>
        <Box>
          <WeatherCard cityWeather={cityWeather} refresh={refresh} />
        </Box>
        {error && <ErrorAlert message={error} />}
      </Box>
    </div>
  );
}

export default App;
