import { Refresh } from "@mui/icons-material";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
const WeatherCard = (props) => {
  const { cityWeather, refresh } = props; // desestructuración de props

  const handleRefresh = () => {
    refresh();
  };
  return (
    <>
      {cityWeather ? (
        <>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            direction="row"
            alignItems="center"
          >
            <Grid item xs={4}>
              {/* <Typography variant="h1">
                <img src={cityWeather.icon} alt={cityWeather.conditionText} />
              </Typography> */}
              <Typography variant="h1">{cityWeather.temp}°</Typography>
              <Typography variant="h5">
                <span>{cityWeather.conditionText}</span>
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs="auto"
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Box display='flex' alignItems='center'>
                <Typography variant="h3" p={2}>
                  {cityWeather.city}
                </Typography>
                <Typography variant="h1">
                  <img src={cityWeather.icon} alt={cityWeather.conditionText} />
                </Typography>
              </Box>
              <Typography variant="h4" p={2}>
                {cityWeather.country}
              </Typography>
              <Typography variant="h5" p={2}>
                Dia: {cityWeather.date}, Hora: {cityWeather.time}
              </Typography>
              <Tooltip title="Presione para refrescar la información">
                <Button onClick={() => handleRefresh()}>
                  Recargar <Refresh />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </>
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
};

export default WeatherCard;
