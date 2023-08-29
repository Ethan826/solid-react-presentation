import { TemperatureUnit } from "../types";
import { Observation } from "../../codecs";
import { ObservationTableRow } from "./observation-table-row";

export type ObservationTableBodyProps = {
  weather: ReadonlyArray<Observation>;
  temperatureUnit: TemperatureUnit;
};

export const ObservationTableBody = ({
  weather,
  temperatureUnit,
}: ObservationTableBodyProps) => (
  <>
    {weather.map((observation) => (
      <ObservationTableRow
        observation={observation}
        temperatureUnit={temperatureUnit}
      />
    ))}
  </>
);
