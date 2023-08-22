import { TableBody } from "@mui/material";
import { ForecastData } from "../../codecs";
import { ForecastTableRow } from "./forecast-table-row";

export type ForecastTableBodyProps = {
  readonly weather: ReadonlyArray<ForecastData>;
  readonly forecastTime: Date | null;
};

export const ForecastTableBody = ({
  weather,
  forecastTime,
}: ForecastTableBodyProps) => (
  <TableBody>
    {weather.map((forecast) => (
      <ForecastTableRow forecast={forecast} forecastTime={forecastTime} />
    ))}
  </TableBody>
);
