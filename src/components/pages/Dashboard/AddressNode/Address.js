// SETUP
import React from "react";

// UI
import { Typography, Box } from "@mui/material";

const Address = ({}) => {
  const onCopy = (text) => {
    // copy test
  };

  return (
    <>
      <Box display="inline-flex" flexDirection="row">
        <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
          ADDRESS
          <Typography
            onClick={() => onCopy("copied text")}
            variant="caption"
            sx={{ color: "blue", ml: 1, cursor: "pointer" }}
          >
            Copy
          </Typography>
        </Typography>
      </Box>

      <Typography
        onClick={() =>
          window.open(
            "https://etherscan.io/address/0xe4762eacebdb7585d32079fdcba5bb94eb5d76f2#tokentxns",
            "_blank"
          )
        }
        className="nowheel"
        overflow="scroll"
        variant="body2"
      >
        0xE4762eAcEbDb7585D32079fdcbA5Bb94eb5d76F2
      </Typography>
    </>
  );
};

export default Address;
