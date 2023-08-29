import { TemperatureUnit } from "../types";
import { ObservationData } from "../../codecs";
import { ObservationTableRow } from "./observation-table-row";

export type ObservationTableBodyProps = {
  weather: ReadonlyArray<ObservationData>;
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
