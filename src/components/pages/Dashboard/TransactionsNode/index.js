/* eslint-disable react/display-name */
// SETUP
import React, { memo, useState, useEffect } from "react";

// REACT FLOW
import { Handle } from "react-flow-renderer";

// UI
import { TextField, Stack, IconButton, Box, Typography } from "@mui/material";
import AddLinkIcon from "@mui/icons-material/AddLink";

// SUBCOMPONENT
import TokenTabs from "./TokenTabs";
import TransactionList from "./TransactionList";

const TransactionsNode = memo((props) => {
  const [label, setLabel] = useState(props.data.nodelabel);
  const [url, setUrl] = useState("");
  const [isLinked, setIsLinked] = useState(false);

  return (
    <>
      <Handle
        type="target"
        position="left"
        id="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={props.isConnectable}
      />
      <Stack
        sx={{ width: 600, overflow: "scroll", p: 1, border: "1px dashed" }}
      >
        <TextField
          id="standard-basic"
          label="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          variant="outlined"
          size="small"
        />

        <Box sx={{ flexDirection: "row", width: "100%", mt: 1 }}>
          <TextField
            id="standard-basic"
            label="Connect Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: "92%" }}
          />
          <IconButton onClick={() => setIsLinked(true)} aria-label="delete">
            <AddLinkIcon />
          </IconButton>
        </Box>
        {isLinked && (
          <Typography
            onClick={() => window.open(url, "_blank")}
            sx={{ color: "green", fontWeight: "bold", ml: 2 }}
          >
            Linked!
          </Typography>
        )}

        {/* <TokenTabs /> */}
        <TransactionList
          currentNode={props}
          transactions={props.data.transactions || []}
          addNode={props.data.onAddTransactionsNode}
        />
      </Stack>

      <Handle
        type="source"
        position="right"
        id="right"
        style={{ background: "#555" }}
        isConnectable={props.isConnectable}
      />
    </>
  );
});

export default TransactionsNode;
