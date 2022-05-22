// SETUP
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// UI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  Checkbox,
  Button,
} from "@mui/material";

// ICONS
import AddIcon from "@mui/icons-material/Add";
import MergeTypeIcon from "@mui/icons-material/MergeType";

// FUNCTIONS
import { size } from "lodash";

// SUBCOMPONENTS
import Row from "./Row";

const TransactionList = ({ currentNode, addNode, transactions }) => {
  const [selectedRows, setSelectedRows] = useState({});

  const onSelectAllRows = (event) => {
    if (event.target.checked) {
      let _selected = {};
      transactions.map((r) => {
        _selected[r.id] = r;
      });
      setSelectedRows(_selected);
      return;
    }
    setSelectedRows({});
  };

  return (
    <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Checkbox
                color="primary"
                indeterminate={
                  size(selectedRows) > 0 &&
                  size(selectedRows) < transactions.length
                }
                checked={
                  transactions.length > 0 &&
                  size(selectedRows) == transactions.length
                }
                onChange={onSelectAllRows}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
            <TableCell align="left">TXN Hash</TableCell>
            <TableCell align="left">Timestamp</TableCell>
            <TableCell align="left">Value</TableCell>
            <TableCell align="left">Token</TableCell>
            <TableCell align="left">From</TableCell>
            <TableCell align="left">To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="nowheel" overflow="scroll">
          {transactions.map((row) => (
            <Row key={row.id} {...{ row, selectedRows, setSelectedRows }} />
          ))}
        </TableBody>
        <TableFooter sx={{ position: "fixed", bottom: -55, left: -15 }}>
          <TableRow>
            <TableCell align="left">
              <Button
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                disabled={
                  size(selectedRows) == 0 ||
                  transactions.length == size(selectedRows)
                }
                onClick={() => addNode(currentNode, selectedRows)}
              >
                New Node
              </Button>
            </TableCell>
            <TableCell align="left">
              <Button
                size="small"
                variant="contained"
                startIcon={<MergeTypeIcon />}
                disabled={size(selectedRows) == 0}
              >
                Merge Transactions
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;
