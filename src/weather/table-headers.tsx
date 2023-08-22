import { TableRow, TableHead, TableCell } from "@mui/material";

export type TableHeadersProps = {
  columnHeaders: ReadonlyArray<string>;
};

export const TableHeaders = ({ columnHeaders }: TableHeadersProps) => (
  <TableHead>
    <TableRow>
      <TableCell key="station">Station</TableCell>
      {columnHeaders.map((columnHeader) => (
        <TableCell align="right" key={columnHeader}>
          {columnHeader}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
