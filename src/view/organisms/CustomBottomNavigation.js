import React, { Component } from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Refresh } from "@mui/icons-material";

const STYLE = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  height: "48px",
  backgroundColor: "white",
};

export default class CustomBottomNavigation extends Component {
  render() {
    const onClickRefresh = function() {
      location.reload(); 
    }

    return (
      <Box sx={STYLE}>
        <BottomNavigation>
          <BottomNavigationAction icon={<Refresh />}  onClick={onClickRefresh}/>
        </BottomNavigation>
      </Box>
    );
  }
}
