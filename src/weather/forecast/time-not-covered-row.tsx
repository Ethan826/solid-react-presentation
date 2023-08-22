import { TableCell, TableRow } from "@mui/material";
import { ForecastData } from "../../codecs";

export type TimeNotCoveredRowProps = { forecast: ForecastData };

export const TimeNotCoveredRow = ({ forecast }: TimeNotCoveredRowProps) => (
  <TableRow key={forecast.icaoId}>
    <TableCell>{forecast.name}</TableCell>
    <TableCell colSpan={3} align="center">
      Time not covered by forecast
    </TableCell>
  </TableRow>
);
