import { TableCell, TableRow } from "@mui/material";
import { TemperatureUnit } from "../types";
import { Observation } from "../../codecs";
import { Clouds } from "../clouds";
import { CelsiusTemperature } from "./celsius-temperature";

export type ObservationTableRowProps = {
  observation: Observation;
  temperatureUnit: TemperatureUnit;
};

export const ObservationTableRow = ({
  temperatureUnit,
  observation: { icaoId, name, wdir, wspd, temp, clouds },
}: ObservationTableRowProps) => (
  <TableRow key={icaoId}>
    <TableCell>{name}</TableCell>
    <TableCell align="right">{wdir}º</TableCell>
    <TableCell align="right">{wspd} kts</TableCell>
    <TableCell align="right">
      <CelsiusTemperature
        temperature={temp}
        temperatureUnit={temperatureUnit}
      />
    </TableCell>
    <TableCell align="right">
      <Clouds clouds={clouds} />
    </TableCell>
  </TableRow>
);
