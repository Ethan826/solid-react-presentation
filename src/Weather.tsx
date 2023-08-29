import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import {
  Typography,
  TableBody,
  Box,
  Table,
  TableRow,
  TableHead,
  TableCell,
  Button,
  Grid,
} from "@mui/material";
import { ForecastArray, ObservationArray, isForecast } from "./codecs";
import { Error } from "./error";
import { getForecastAtTime } from "./get-forecast-at-time";

export type WeatherProps = {
  readonly stations: ReadonlyArray<string>;
};

export type Product = "forecast" | "observation";
export type temperatureUnit = "C" | "F";

export const Weather = ({ stations }: WeatherProps): JSX.Element => {
  const [product, setProduct] = useState<Product>("forecast");
  const [forecastTime, setForecastTime] = useState<Date | null>(new Date());
  const [temperatureUnit, setTemperatureUnit] = useState<temperatureUnit>("C");

  const url =
    product === "forecast"
      ? `/data/taf.php?ids=${stations.join(",")}&format=json`
      : `/data/metar.php?ids=${stations.join(",")}&format=json`;

  const [weather, setWeather] = useState<
    Zod.SafeParseReturnType<unknown, ForecastArray | ObservationArray>
  >({ success: true, data: [] });

  useEffect(() => {
    fetch(url, { mode: "cors" })
      .then((data) => data.json())
      .then((data) =>
        product === "forecast"
          ? ForecastArray.safeParse(data)
          : ObservationArray.safeParse(data)
      )
      .then(setWeather);
  }, [product]);

  return !weather.success ? (
    <Error />
  ) : (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant={product === "observation" ? "contained" : "outlined"}
            onClick={() => {
              setProduct("observation");
              setForecastTime(null);
            }}
          >
            Observation
          </Button>
          <Button
            variant={product === "forecast" ? "contained" : "outlined"}
            onClick={() => {
              setProduct("forecast");
              setForecastTime(new Date());
            }}
          >
            Forecast
          </Button>
        </Grid>
        <Grid item xs={12}>
          {product === "forecast" ? (
            <DateTimePicker label="Forecast Time" onChange={setForecastTime} />
          ) : (
            <>
              <Button
                variant={temperatureUnit === "C" ? "contained" : "outlined"}
                onClick={() => setTemperatureUnit("C")}
              >
                Celsius
              </Button>
              <Button
                variant={temperatureUnit === "F" ? "contained" : "outlined"}
                onClick={() => setTemperatureUnit("F")}
              >
                Fahrenheit
              </Button>
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography component="h1" variant="h4">
              Here&rsquo;s your weather
              {product === "forecast" ? " forecast" : " observation"}:
            </Typography>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Station</TableCell>
                <TableCell align="right">Wind Direction</TableCell>
                <TableCell align="right">Wind Speed</TableCell>
                {product === "observation" ? (
                  <TableCell align="right">Temperature</TableCell>
                ) : null}
                <TableCell align="right">Clouds</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weather.data.map((station) => (
                <TableRow key={station.icaoId}>
                  <TableCell>{station.name}</TableCell>
                  {isForecast(station) ? (
                    <>
                      {forecastTime == null ? (
                        <TableCell colSpan={3} align="center">
                          Time not covered by forecast
                        </TableCell>
                      ) : getForecastAtTime(station, forecastTime) == null ? (
                        <TableCell colSpan={3} align="center">
                          Time not covered by forecast
                        </TableCell>
                      ) : (
                        <>
                          <TableCell align="right">
                            {getForecastAtTime(station, forecastTime)?.wdir}º
                          </TableCell>
                          <TableCell align="right">
                            {getForecastAtTime(station, forecastTime)?.wspd} kts
                          </TableCell>
                          <TableCell align="right">
                            {getForecastAtTime(station, forecastTime)
                              ?.clouds.map(
                                ({ cover, base }) =>
                                  cover +
                                  (base ? ` at ${base.toLocaleString()}` : "")
                              )
                              .join(", ")}
                          </TableCell>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <TableCell align="right">{station.wdir}º</TableCell>
                      <TableCell align="right">{station.wspd} kts</TableCell>
                      <TableCell align="right">
                        {temperatureUnit === "C"
                          ? `${station.temp}º C`
                          : `${(station.temp * 1.8 + 32).toFixed(1)}º F`}
                      </TableCell>
                      <TableCell align="right">
                        {station.clouds
                          .map(
                            ({ cover, base }) =>
                              cover +
                              (base ? ` at ${base.toLocaleString()}` : "")
                          )
                          .join(", ")}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
