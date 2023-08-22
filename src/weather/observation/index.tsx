import * as E from "fp-ts/Either";
import { useState } from "react";
import { Table, Grid } from "@mui/material";
import { Error } from "../../Error";
import { useWeather } from "../use-weather";
import { TableHeaders } from "../table-headers";
import { Header } from "../header";
import { TemperatureUnit } from "../types";
import { ObservationArray } from "../../codecs";
import { Fetcher } from "../../services/fetcher";
import { TemperatureControls } from "./temperature-control";
import { ObservationTableBody } from "./observation-table-body";

export type ObservationProps = {
  readonly stations: ReadonlyArray<string>;
  readonly fetcher: Fetcher<ObservationArray>;
};

export const Observation = ({
  stations,
  fetcher,
}: ObservationProps): JSX.Element => {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("C");
  const weather = useWeather(fetcher, stations, "observation");

  return E.isLeft(weather) ? (
    <Error />
  ) : (
    <>
      <TemperatureControls
        setTemperatureUnit={setTemperatureUnit}
        temperatureUnit={temperatureUnit}
      />
      <Grid item xs={12}>
        <Header product="observation" />
        <Table>
          <TableHeaders
            columnHeaders={[
              "Wind Direction",
              "Wind Speed",
              "Temperature",
              "Clouds",
            ]}
          />
          <ObservationTableBody
            weather={weather.right}
            temperatureUnit={temperatureUnit}
          />
        </Table>
      </Grid>
    </>
  );
};
