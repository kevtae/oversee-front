// SETUP
import React from "react";

// UI
import { Typography, List, ListItem, ListItemText, Badge } from "@mui/material";

const Balance = ({ balance }) => {
  return (
    <>
      <Typography
        variant="body2"
        sx={{ fontWeight: "bold", mt: 2, mb: 1, textDecoration: "underline" }}
      >
        BALANCE
      </Typography>
      <List className="nowheel" sx={{ maxHeight: 200, overflow: "scroll" }}>
        {Object.entries(balance).map((token, i) => {
          return (
            <ListItem key={i}>
              <Badge badgeContent={i + 2} color="info" sx={{ mr: 3 }} />
              <ListItemText
                primary={token[0].toUpperCase()}
                secondary={token[1]}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default Balance;
