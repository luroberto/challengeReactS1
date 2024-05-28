/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// importación de componentes
import SearchComponent from "./components/SearchComponent";
import WeatherCard from "./components/WeatherCard";
import getCityWeather from "./services/weatherService";
import ErrorAlert from "./components/ErrorAlert";
// material
import { Box } from "@mui/material";
// utils
import { weatherConditions } from "./utils/backgrounds";
// styles
import "./App.css";

function App() {
  const [cityWeather, setCityWeather] = useState(null);
  const [city, setCity] = useState("buenos aires"); // estado por default
  const [error, setError] = useState(null);

  // se consume el servicio cuando se detecta cambios en el estado 'city'
  useEffect(() => {
    getCityWeatherService();
  }, [city]);

  const createCityWeather = (response) => {
    // formateo de fecha y hora
    const [datePart, timePart] = response.location.localtime.split(" ");
    const [year, month, day] = datePart.split("-");
    let [hour, minute] = timePart.split(":");
    const formattedDate = `${day}/${month}/${year}`; // dd/mm//yy
    const formattedTime = `${hour}:${minute} hs`; // hh:mm
  // se creo un objeto con la información relevante para el componente WeatherCard
  setCityWeather({
    city: response.location.name,
    country:
      response.location.region + ", " + response.location.country,
    temp:  Math.round(response.current.temp_c),
    condition: response.current.condition.code,
    icon: response.current.condition.icon,
    conditionText: response.current.condition.text,
    date: formattedDate,
    time: formattedTime,
  });
  }

  const getCityWeatherService = () => {
    if (city) {
      getCityWeather(city)
        .then((response) => {
          if (response.error) {
            // identificación del error
            throw response.error;
          } else {
            // resetea el estado del error
            setError(null);
            // crea el objeto cityWeather y actualiza su estado
            createCityWeather(response)
          }
        })
        .catch((error) => {
          // seteo de el estado del error
          setError(error.message);
        });
    }
  };

  // función que actualiza el servicio
  const refresh = () => { 
    getCityWeatherService(); 
  };

  // función que setea el estado de la ciudad
  const getCity = (city) => {
    if (city) {
      setCity(city.id);
    }
  };

  // función que nos permite retornar la url de la imagen según la condición del clima
  const getBackgroundStyle = (conditionText) => {
    // Encuentra la URL de la imagen según el conditionText
    const condition = weatherConditions.find((condition) => condition.condition === conditionText);
    if (condition) {
      return { background: `url(${condition.imageUrl})` };
    } else {
      return null;
    }
  };

  return (
    <div id="root" style={cityWeather ? getBackgroundStyle(cityWeather.conditionText) : null} className="backgroundImage">
      <Box p={2} className='container'>
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* se obtiene la ciudad seleccionada en el SearchComponent */}
          <SearchComponent getCity={getCity} />
        </Box>
        <Box>
          {/* se envía el objeto con los datos del clima de la ciudad */}
          {/* se obtiene la función refresh para volver a llamar el servicio  */}
          <WeatherCard cityWeather={cityWeather} refresh={refresh} />
        </Box>
        {error && <ErrorAlert message={error} />}
      </Box>
    </div>
  );
}

export default App;
