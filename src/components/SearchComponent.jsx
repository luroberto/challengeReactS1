/* eslint-disable react/prop-types */
import { useState } from "react";
// material
import { Autocomplete, TextField, Box } from "@mui/material";
// utils
import { cityOptions } from "../utils/cities";

const SearchComponent = (props) => {
  const { getCity } = props;
  const [value, setValue] = useState(cityOptions[7]); // estado por default: Buenos Aires
  const [inputValue, setInputValue] = useState("");

  // actualiza el estado de la ciudad y del value del select
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue) {
      getCity(newValue);
    }
  };

  // actualiza el estado del inputValue (utilizado para todas las ciudades que no están en las options)
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  // evalúa si la ciudad existe en la options, y sino crea un objeto con la ciudad escrita
  const handleSubmit = () => {
    if (inputValue) {
      const matchedCity = cityOptions.find(city => city.label.toLowerCase() === inputValue.toLowerCase());
      if (matchedCity) {
        getCity(matchedCity);
      } else {
        getCity({ id: inputValue, label: inputValue });
      }
    }
  };

  // llama a la función handleSubmit al presionar enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Box display="flex" alignItems="center" onKeyPress={handleKeyPress}>
      {cityOptions && (
        <Autocomplete
          value={value}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          disablePortal
          id="combo-box-demo"
          options={cityOptions}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Ciudad" variant="standard" />}
        />
      )}
    </Box>
  );
};

export default SearchComponent;
