import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as E from "fp-ts/Either";
import { useState } from "react";
import { Table, Grid } from "@mui/material";
import { Error } from "../../Error";
import { Header } from "../header";
import { useWeather } from "../use-weather";
import { ForecastArray } from "../../codecs";
import { Fetcher } from "../../services/fetcher";
import { TableHeaders } from "../table-headers";
import { ForecastTableBody } from "./forecast-table-body";

export type ForecastProps = {
  readonly stations: ReadonlyArray<string>;
  readonly fetcher: Fetcher<ForecastArray>;
};

export const Forecast = ({ stations, fetcher }: ForecastProps): JSX.Element => {
  const [forecastTime, setForecastTime] = useState<Date | null>(new Date());
  const weather = useWeather(fetcher, stations, "forecast");

  return E.isLeft(weather) ? (
    <Error />
  ) : (
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
              weather={weather.right}
            />
          </Table>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
