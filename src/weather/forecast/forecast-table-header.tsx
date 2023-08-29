import { StationHeader, TableHeaderCell, TableHeaders } from "../table-headers";

export const ForecastTableHeader = () => (
  <TableHeaders>
    <StationHeader />
    <TableHeaderCell columnHeader="Wind Direction" />
    <TableHeaderCell columnHeader="Wind Speed" />
    <TableHeaderCell columnHeader="Wind Clouds" />
  </TableHeaders>
);
