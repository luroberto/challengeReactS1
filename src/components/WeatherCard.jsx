// material
import { Refresh } from "@mui/icons-material";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/* eslint-disable react/prop-types */
const WeatherCard = (props) => {
  // desestructuración de la props
  const { cityWeather, refresh } = props;

  // constantes para manejar los mediaquery
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // función que utiliza la prop para volver a llamar el servicio
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
            direction={isSmallScreen ? "column" : "row"}
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography sx={{ fontSize: isSmallScreen ? "10rem" : "18rem" }}>
                {cityWeather.temp}°
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
              <Box display="flex" alignItems="center">
                <Typography variant="h3" p={2}>
                  {cityWeather.city}
                </Typography>
                <Typography variant="h1">
                  <img src={cityWeather.icon} alt={cityWeather.conditionText} />
                </Typography>
              </Box>
              <Typography variant="h5" pl={2}>
                <span>{cityWeather.conditionText}</span>
              </Typography>
              <Typography variant="h4" pl={2}>
                {cityWeather.country}
              </Typography>
              <Typography variant="h5" pl={2}>
                Dia: {cityWeather.date}, Hora: {cityWeather.time}
              </Typography>
              <Box p={1}>
                <Tooltip title="Presione para refrescar la información">
                  <Button onClick={() => handleRefresh()}>
                    Recargar <Refresh />
                  </Button>
                </Tooltip>
              </Box>
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
