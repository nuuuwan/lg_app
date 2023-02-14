import React, { Component } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import CustomBottomNavigation from "../organisms/CustomBottomNavigation";
import LGCandidateView from "../molecules/LGCandidateView";

import Candidate from "../../nonview/core/Candidate";
import LG from "../../nonview/core/LG";
import LGSelector from "../organisms/LGSelector";

const DEFAULT_LG_ID = "LG-11001";

const STYLE = {  
};

const STYLE_HEADER = {
  padding: 2,
  paddingRight: 2,
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: 100,
}

const STYLE_BODY = {
  padding: 10,
  position: "fixed",
  top: 100,
  bottom: 48,
  width: "100%",
  overflow: "scroll",
}

const STYLE_FOOTER = {
  position: "fixed",
  bottom: 0,
  top: 48,
  width: "100%",
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLGID: DEFAULT_LG_ID,
      candidateList: null,
      lg: null,
    };
  }

  async updateState() {
    const { selectedLGID } = this.state;
    const candidateList = await Candidate.listFromLG(selectedLGID);
    const lg = await LG.fromID(selectedLGID);
    this.setState({
      lg,
      candidateList,
    });
  }

  async componentDidMount() {
    await this.updateState();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.selectedLGID !== this.state.selectedLGID) {
      await this.updateState();
    }
  }

  onChangeLGID(selectedLGID) {
    console.debug("onChangeLGID.selectedLGID", selectedLGID);
    this.setState({ selectedLGID });
  }

  render() {
    const { lg, candidateList, selectedLGID } = this.state;
    console.debug(selectedLGID);
    if (!lg) {
      return <CircularProgress />;
    }

    const keyLGDependent = "lg-dependent-" + selectedLGID;

    return (
      <Box sx={STYLE} key={keyLGDependent}>
        <Box sx={STYLE_HEADER}>        
          <LGSelector
            selectedLGID={selectedLGID}
            onChangeLGID={this.onChangeLGID.bind(this)}
          />
        </Box>
        <Box style={STYLE_BODY}>
          <LGCandidateView candidateList={candidateList} />
        </Box>
        <CustomBottomNavigation />
      </Box>
    );
  }
}
