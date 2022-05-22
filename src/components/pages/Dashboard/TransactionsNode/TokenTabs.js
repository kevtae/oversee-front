/* eslint-disable react/display-name */
// SETUP
import React, { useState } from "react";

// UI
import { Typography, Tabs, Tab } from "@mui/material";

const TokenTabs = ({}) => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Typography
        variant="body2"
        sx={{ fontWeight: "bold", mt: 2, mb: 1, textDecoration: "underline" }}
      >
        TRANSACTIONS
      </Typography>
      <Tabs
        variant="scrollable"
        className="nowheel"
        value={tab}
        scrollButtons={false}
        onChange={(e, val) => setTab(val)}
        TabIndicatorProps={{ style: { display: "none" } }}
      >
        <Tab label="ETH" />
        <Tab label="USDC" />
        <Tab label="USDT" />
        <Tab label="KRAUSE" />
        <Tab label="CLUB" />
      </Tabs>
    </>
  );
};

export default TokenTabs;
