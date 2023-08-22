import { TableCell, TableRow } from "@mui/material";
import { ForecastData } from "../../codecs";
import { Clouds } from "../clouds";
import { TimeNotCoveredRow } from "./time-not-covered-row";
import { getForecastAtTime } from "./get-forecast-at-time";

export type ForecastTableRowProps = {
  forecast: ForecastData;
  forecastTime: Date | null;
};

export const ForecastTableRow = ({
  forecast,
  forecastTime,
}: ForecastTableRowProps) => {
  if (forecastTime == null) return <TimeNotCoveredRow forecast={forecast} />;

  const forecastAtTime = getForecastAtTime(forecast, forecastTime);

  if (forecastAtTime == null) {
    return <TimeNotCoveredRow forecast={forecast} />;
  }

  return (
    <TableRow key={forecast.icaoId}>
      <TableCell>{forecast.name}</TableCell>
      <TableCell align="right">{forecastAtTime.wdir}º</TableCell>
      <TableCell align="right">{forecastAtTime.wspd} kts</TableCell>
      <TableCell align="right">
        <Clouds clouds={forecastAtTime.clouds} />
      </TableCell>
    </TableRow>
  );
};
