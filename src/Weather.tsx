import { formatValidationErrors } from "io-ts-reporters";
import * as t from "io-ts";
import * as E from "fp-ts/Either";
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
} from "@mui/material";
import { Taf, Metar } from "./codecs";

export type WeatherProps = {
  readonly stations: ReadonlyArray<string>;
  readonly product: "forecast" | "observation";
};

export const Weather = ({ stations, product }: WeatherProps) => {
  const url =
    product === "forecast"
      ? `/data/taf.php?ids=${stations.join(",")}&format=json`
      : `/data/metar.php?ids=${stations.join(",")}&format=json`;

  const [weather, setWeather] = useState<
    E.Either<ReadonlyArray<string>, ReadonlyArray<Taf | Metar>>
  >(E.right([]));

  useEffect(() => {
    fetch(url, { mode: "cors" })
      .then((data) => data.json())
      .then(
        flow(
          t.readonlyArray(product === "forecast" ? Taf : Metar).decode,
          E.mapLeft(formatValidationErrors)
        )
      )
      .then(setWeather);
  }, []);

  return pipe(
    weather,
    E.foldW(
      (e) => <code>{JSON.stringify(e, null, 2)}</code>,
      (weather) => (
        <>
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
              {weather.map((station) => (
                <TableRow key={station.icaoId}>
                  <TableCell>{station.name}</TableCell>
                  <TableCell align="right">
                    {product === "forecast"
                      ? (station as Taf).fcsts[0].wdir
                      : (station as Metar).wdir}
                    º
                  </TableCell>
                  <TableCell align="right">
                    {product === "forecast"
                      ? (station as Taf).fcsts[0].wspd
                      : (station as Metar).wspd}{" "}
                    kts
                  </TableCell>
                  <TableCell align="right">
                    {product === "forecast"
                      ? (station as Taf).fcsts[0].clouds
                          .map(
                            ({ cover, base }) =>
                              cover +
                              (base ? ` at ${base.toLocaleString()}` : "")
                          )
                          .join(", ")
                      : (station as Metar).clouds
                          .map(
                            ({ cover, base }) =>
                              cover +
                              (base ? ` at ${base.toLocaleString()}` : "")
                          )
                          .join(", ")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )
    )
  );
};
