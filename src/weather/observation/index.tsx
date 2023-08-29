import { useState } from "react";
import { Table, Grid } from "@mui/material";
import { weatherHookFactory } from "../weather-hook-factory";
import { Header } from "../header";
import { TemperatureUnit } from "../types";
import { ObservationArray } from "../../codecs";
import { Fetcher } from "../../services/fetcher";
import { TemperatureControls } from "./temperature-control";
import { ObservationTableBody } from "./observation-table-body";
import { ObservationTableHeader } from "./observation-table-header";

export type ObservationProps = {
  readonly stations: ReadonlyArray<string>;
  readonly fetcher: Fetcher<ObservationArray>;
};

// Crazy example, EXTREME SRP: hooks for all logic, components for all
// rendering. As Skeate pointed out, this will not lint properly.

const useObservation = ({ fetcher, stations }: ObservationProps) => {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("C");

  const weather = weatherHookFactory({
    urlMaker: (stations: ReadonlyArray<string>) =>
      `/data/metar.php?ids=${stations.join(",")}&format=json`,
    fetcher,
  })(stations);

  return { weather, temperatureUnit, setTemperatureUnit };
};

// According to this pattern, you'd usually flow the hook into the component

export const Observation = (props: ObservationProps) => {
  const { weather, temperatureUnit, setTemperatureUnit } =
    useObservation(props);

  return (
    <>
      <TemperatureControls
        setTemperatureUnit={setTemperatureUnit}
        temperatureUnit={temperatureUnit}
      />
      <Grid item xs={12}>
        <Header product="observation" />
        <Table>
          <ObservationTableHeader />
          <ObservationTableBody
            weather={weather}
            temperatureUnit={temperatureUnit}
          />
        </Table>
      </Grid>
    </>
  );
};
