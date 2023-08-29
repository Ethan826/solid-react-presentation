import { StationHeader, TableHeaderCell, TableHeaders } from "../table-headers";

export const ObservationTableHeader = () => (
  <TableHeaders>
    <StationHeader />
    <TableHeaderCell columnHeader="Wind Direction" />
    <TableHeaderCell columnHeader="Wind Speed" />
    <TableHeaderCell columnHeader="Temperature" />
    <TableHeaderCell columnHeader="Clouds" />
  </TableHeaders>
);
