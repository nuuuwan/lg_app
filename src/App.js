import React, { Component } from "react";
import HomePage from "./view/pages/HomePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {DEFAULT_FONT_FAMILY} from "./view/atoms/DefaultStyles";
const THEME = createTheme({
  // palette: {
  //   primary: {
  //     main: "#c00",
  //   },
  //   secondary: {
  //     main: "#f80",
  //   },
  //   success: {
  //     main: "#080",
  //   },
  //   info: {
  //     main: "#cc0",
  //   },
  // },
  typography: {
    fontFamily: [DEFAULT_FONT_FAMILY, "sans-serif"].join(","),
    fontSize: 14,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
