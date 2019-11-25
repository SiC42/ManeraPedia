import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

export const table = tableProps => {
  const { children } = tableProps;
  return <Table>{children}</Table>;
};

export const head = tableProps => {
  const { children } = tableProps;
  return <TableHead>{children}</TableHead>;
};

export const body = tableProps => {
  const { children } = tableProps;
  return <TableBody>{children}</TableBody>;
};

export const row = tableProps => {
  const { children } = tableProps;
  return <TableRow>{children}</TableRow>;
};

export function cell(cellProps) {
  const { align, children } = cellProps;
  const alignStyle = align || "inherit";
  return <TableCell align={alignStyle}>{children}</TableCell>;
}
