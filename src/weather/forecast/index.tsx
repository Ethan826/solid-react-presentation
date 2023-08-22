import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as E from "fp-ts/Either";
import { useState } from "react";
import { Table, Grid } from "@mui/material";
import { Error } from "../../error";
import { Header } from "../header";
import { useWeather } from "../use-weather";
import { ForecastArray } from "../../codecs";
import { Fetcher } from "../../services/fetcher";
import { TableHeaders } from "../table-headers";
import { ForecastTableBody } from "./forecast-table-body";
import { flow, pipe } from "fp-ts/function";

export type ForecastProps = {
  readonly stations: ReadonlyArray<string>;
  readonly fetcher: Fetcher<ForecastArray>;
};

const useForecast = ({ stations, fetcher }: ForecastProps) => {
  const [forecastTime, setForecastTime] = useState<Date | null>(new Date());
  const weather = useWeather(fetcher, stations, "forecast");

  return pipe(
    weather,
    E.map((weather) => ({ weather, forecastTime, setForecastTime }))
  );
};

export const Forecast = flow(
  useForecast,
  E.fold(
    () => <Error />,
    ({ weather, forecastTime, setForecastTime }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DateTimePicker label="Forecast Time" onChange={setForecastTime} />
          </Grid>
          <Grid item xs={12}>
            <Header product="forecast" />
            <Table>
              <TableHeaders
                columnHeaders={["Wind Direction", "Wind Speed", "Clouds"]}
              />
              <ForecastTableBody
                forecastTime={forecastTime}
                weather={weather}
              />
            </Table>
          </Grid>
        </Grid>
      </LocalizationProvider>
    )
  )
);
