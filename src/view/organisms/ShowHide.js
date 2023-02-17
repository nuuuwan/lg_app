import React, { Component } from "react";
import { Box } from "@mui/material";
import {STYLE} from "../atoms/DefaultStyles"
import "../atoms/Clickable.css";


export default class ShowHide extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  onToggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <Box onClick={this.onToggleShow.bind(this)} className="clickable" style={STYLE}>
        {this.props.children[0]}
        {this.state.show ? this.props.children[1] : null}
      </Box>
    );
  }
}
