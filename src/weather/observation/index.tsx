import * as E from "fp-ts/Either";
import { useState } from "react";
import { Table, Grid } from "@mui/material";
import { Error } from "../../error";
import { useWeather } from "../use-weather";
import { TableHeaders } from "../table-headers";
import { Header } from "../header";
import { TemperatureUnit } from "../types";
import { ObservationArray } from "../../codecs";
import { Fetcher } from "../../services/fetcher";
import { TemperatureControls } from "./temperature-control";
import { ObservationTableBody } from "./observation-table-body";
import { flow, pipe } from "fp-ts/function";

export type ObservationProps = {
  readonly stations: ReadonlyArray<string>;
  readonly fetcher: Fetcher<ObservationArray>;
};

const useObservation = ({ fetcher, stations }: ObservationProps) => {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("C");
  const weather = useWeather(fetcher, stations, "observation");

  return pipe(
    weather,
    E.map((weather) => ({ weather, temperatureUnit, setTemperatureUnit }))
  );
};

export const Observation = flow(
  useObservation,
  E.fold(
    () => <Error />,
    ({ weather, temperatureUnit, setTemperatureUnit }) => (
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
              weather={weather}
              temperatureUnit={temperatureUnit}
            />
          </Table>
        </Grid>
      </>
    )
  )
);
