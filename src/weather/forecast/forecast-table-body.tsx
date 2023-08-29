import { TableBody } from "@mui/material";
import { Forecast } from "../../codecs";
import { ForecastTableRow } from "./forecast-table-row";

export type ForecastTableBodyProps = {
  readonly weather: ReadonlyArray<Forecast>;
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
