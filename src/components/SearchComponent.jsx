/* eslint-disable react/prop-types */
import { Autocomplete, TextField, Box } from "@mui/material";
import { cityOptions } from "../utils/cities";
import { useState } from "react";

const SearchComponent = (props) => {
  const { getCity } = props;
  const [value, setValue] = useState(cityOptions[7]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue) {
      getCity(newValue);
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

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
