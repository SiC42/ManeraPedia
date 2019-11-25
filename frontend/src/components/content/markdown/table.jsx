import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import React from "react";

export default function useTableRenderer() {
  const table = tableProps => {
    const { children } = tableProps;
    return <Table>{children}</Table>;
  };

  const head = tableProps => {
    const { children } = tableProps;
    return <TableHead>{children}</TableHead>;
  };

  const body = tableProps => {
    const { children } = tableProps;
    return <TableBody>{children}</TableBody>;
  };

  const row = tableProps => {
    const { children } = tableProps;
    return <TableRow>{children}</TableRow>;
  };

  const cell = cellProps => {
    const { align, children } = cellProps;
    const alignStyle = align || "inherit";
    return <TableCell align={alignStyle}>{children}</TableCell>;
  };

  return {
    table,
    tableHead: head,
    tableBody: body,
    tableRow: row,
    tableCell: cell
  };
}
