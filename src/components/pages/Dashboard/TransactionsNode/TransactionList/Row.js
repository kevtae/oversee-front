// SETUP
import React from "react";

// UI
import { TableCell, TableRow, Checkbox } from "@mui/material";

const Row = ({ row, selectedRows, setSelectedRows }) => {
  const onSelectRow = (event, row) => {
    if (event.target.checked) {
      setSelectedRows({ ...selectedRows, [row.id]: row });
    } else {
      let _selectedRows = { ...selectedRows };
      delete _selectedRows[row.id];
      setSelectedRows(_selectedRows);
    }
  };

  return (
    <TableRow key={row.id} sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell padding="checkbox">
        <Checkbox
          onClick={(event) => onSelectRow(event, row)}
          color="primary"
          checked={selectedRows[row.id] ? true : false}
        />
      </TableCell>
      <TableCell onClick={() => console.log("copy")} component="th" scope="row">
        {row.hash.substring(0, 5)}...
        {row.hash.substring(row.hash.length - 5, row.hash.length)}
      </TableCell>
      <TableCell align="left">{row.timestamp}</TableCell>
      <TableCell align="left">{row.sentvalue}</TableCell>
      <TableCell align="left">{row.tokensymbol}</TableCell>
      <TableCell align="left">
        {row.sentfrom.substring(0, 5)}...
        {row.sentfrom.substring(row.sentfrom.length - 5, row.sentfrom.length)}
      </TableCell>
      <TableCell align="left">
        {row.sentto.substring(0, 5)}...
        {row.sentto.substring(row.sentto.length - 5, row.sentto.length)}
      </TableCell>
    </TableRow>
  );
};

export default Row;
