import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatValidationErrors } from "io-ts-reporters";
import * as t from "io-ts";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { pipe, flow } from "fp-ts/function";
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
import { Forecast, Observation } from "./codecs";
import { Error } from "./Error";
import { getForecastAtTime } from "./get-forecast-at-time";

export type WeatherProps = {
  readonly stations: ReadonlyArray<string>;
};

export type Product = "forecast" | "observation";

export const Weather = ({ stations }: WeatherProps) => {
  const [product, setProduct] = useState<Product>("forecast");
  const [forecastTime, setForecastTime] = useState<Date | null>(new Date());

  const url =
    product === "forecast"
      ? `/data/taf.php?ids=${stations.join(",")}&format=json`
      : `/data/metar.php?ids=${stations.join(",")}&format=json`;

  const [weather, setWeather] = useState<
    E.Either<ReadonlyArray<string>, ReadonlyArray<Forecast | Observation>>
  >(E.right([]));

  useEffect(() => {
    fetch(url, { mode: "cors" })
      .then((data) => data.json())
      .then(
        flow(
          t.readonlyArray(product === "forecast" ? Forecast : Observation)
            .decode,
          E.mapLeft(formatValidationErrors)
        )
      )
      .then(setWeather);
  }, [product]);

  return pipe(
    weather,
    E.foldW(
      () => <Error />,
      (weather) => (
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
              {weather.map((station: Forecast | Observation) => (
                <TableRow key={station.icaoId}>
                  <TableCell>{station.name}</TableCell>
                  {Forecast.is(station) ? (
                    <>
                      {pipe(
                        forecastTime,
                        O.fromNullable,
                        O.flatMap(getForecastAtTime(station)),
                        O.foldW(
                          () => (
                            <>
                              <TableCell align="right">
                                Time not covered by forecast
                              </TableCell>
                              <TableCell align="right">
                                Time not covered by forecast
                              </TableCell>
                              <TableCell align="right">
                                Time not covered by forecast
                              </TableCell>
                            </>
                          ),
                          ({ wspd, wdir, clouds }) => (
                            <>
                              <TableCell align="right">{wdir}º</TableCell>
                              <TableCell align="right">{wspd} kts</TableCell>
                              <TableCell align="right">
                                {clouds
                                  .map(
                                    ({ cover, base }) =>
                                      cover +
                                      (base
                                        ? ` at ${base.toLocaleString()}`
                                        : "")
                                  )
                                  .join(", ")}
                              </TableCell>
                            </>
                          )
                        )
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
        </LocalizationProvider>
      )
    )
  );
};
