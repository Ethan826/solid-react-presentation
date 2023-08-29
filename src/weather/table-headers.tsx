import { TableRow, TableHead, TableCell } from "@mui/material";

export type TableHeadersProps = {
  children: React.ReactNode;
};

export const TableHeaders = ({ children }: TableHeadersProps) => (
  <TableHead>
    <TableRow>{children}</TableRow>
  </TableHead>
);

export type ColumnHeaderCellProps = {
  columnHeader: string;
};

export const TableHeaderCell = ({ columnHeader }: { columnHeader: string }) => (
  <TableCell align="right" key={columnHeader}>
    {columnHeader}
  </TableCell>
);

export const StationHeader = () => <TableCell key="station">Station</TableCell>;
