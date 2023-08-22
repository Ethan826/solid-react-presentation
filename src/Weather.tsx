import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as E from "fp-ts/Either";
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
} from "@mui/material";
import {
  Forecast,
  ForecastArray,
  Observation,
  ObservationArray,
} from "./codecs";
import { Error } from "./Error";
import { getForecastAtTime } from "./get-forecast-at-time";

export type WeatherProps = {
  readonly stations: ReadonlyArray<string>;
};

export type Product = "forecast" | "observation";

export const Weather = ({ stations }: WeatherProps): JSX.Element => {
  const [product, setProduct] = useState<Product>("forecast");
  const [forecastTime, setForecastTime] = useState<Date | null>(new Date());

  const url =
    product === "forecast"
      ? `/data/taf.php?ids=${stations.join(",")}&format=json`
      : `/data/metar.php?ids=${stations.join(",")}&format=json`;

  const [weather, setWeather] = useState<
    E.Either<unknown, ForecastArray | ObservationArray>
  >(E.right([]));

  useEffect(() => {
    fetch(url, { mode: "cors" })
      .then((data) => data.json())
      .then((data) =>
        product === "forecast"
          ? ForecastArray.decode(data)
          : ObservationArray.decode(data)
      )
      .then(setWeather);
  }, [product]);

  return E.isLeft(weather) ? (
    <Error />
  ) : (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
      {product === "forecast" ? (
        <DateTimePicker label="Forecast Time" onChange={setForecastTime} />
      ) : null}
      <Box>
        <Typography component="h1" variant="h4">
          Here's your weather report
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Station</TableCell>
            <TableCell align="right">Wind Direction</TableCell>
            <TableCell align="right">Wind Speed</TableCell>
            <TableCell align="right">Clouds</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weather.right.map((station: Forecast | Observation) => (
            <TableRow key={station.icaoId}>
              <TableCell>{station.name}</TableCell>
              {Forecast.is(station) ? (
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
                    {station.clouds
                      .map(
                        ({ cover, base }) =>
                          cover + (base ? ` at ${base.toLocaleString()}` : "")
                      )
                      .join(", ")}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </LocalizationProvider>
  );
};
