/* eslint-disable react/display-name */
// SETUP
import React, { memo, useState } from "react";

// REACT FLOW
import { Handle } from "react-flow-renderer";

// UI
import { TextField, Stack } from "@mui/material";

// SUBCOMPONENT
import Address from "./Address";
import Balance from "./Balance";

const AddressNode = memo((props) => {
  const [label, setLabel] = useState(props.data.nodelabel);

  const onCopy = (text) => {
    // copy test
  };

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
      <Stack sx={{ width: 250, overflow: "hidden", p: 1, border: "1px solid" }}>
        <TextField
          id="standard-basic"
          label="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Address />
        <Balance balance={props.data.balance} />
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

export default AddressNode;
