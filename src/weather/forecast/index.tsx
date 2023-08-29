import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { Table, Grid } from "@mui/material";
import { Header } from "../header";
import { weatherHookFactory } from "../weather-hook-factory";
import { ForecastArray } from "../../codecs";
import { Fetcher } from "../../services/fetcher";
import { ForecastTableBody } from "./forecast-table-body";
import { ForecastTableHeader } from "./forecast-table-header";

export type ForecastProps = {
  readonly stations: ReadonlyArray<string>;
  readonly fetcher: Fetcher<ForecastArray>;
};

const useWeather = ({ stations, fetcher }: ForecastProps) =>
  weatherHookFactory({
    urlMaker: (stations: ReadonlyArray<string>) =>
      `/data/taf.php?ids=${stations.join(",")}&format=json`,
    fetcher,
  })(stations);

export const Forecast = (props: ForecastProps) => {
  const [forecastTime, setForecastTime] = useState<Date | null>(new Date());

  const weather = useWeather(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DateTimePicker label="Forecast Time" onChange={setForecastTime} />
        </Grid>
        <Grid item xs={12}>
          <Header product="forecast" />
          <Table>
            <ForecastTableHeader />
            <ForecastTableBody forecastTime={forecastTime} weather={weather} />
          </Table>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
