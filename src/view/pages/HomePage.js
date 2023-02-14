import React, { Component } from "react";
import { Box, CircularProgress } from "@mui/material";
import CustomBottomNavigation from "../organisms/CustomBottomNavigation";
import LGCandidateView from "../molecules/LGCandidateView";

import Candidate from "../../nonview/core/Candidate";
import Ward from "../../nonview/core/Ward";
import LG from "../../nonview/core/LG";
import LGSelector from "../organisms/LGSelector";
import Geo from "../../nonview/core/Geo";

const DEFAULT_LG_ID = "LG-11001";

const STYLE = {};

const STYLE_HEADER = {
  padding: 2,
  paddingRight: 2,
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: 100,
};

const STYLE_BODY = {
  padding: 20,
  position: "fixed",
  top: 100,
  bottom: 48,
  width: "90%",
  overflow: "scroll",
};

const STYLE_FOOTER = {
  position: "fixed",
  bottom: 0,
  top: 48,
  width: "100%",
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLGID: DEFAULT_LG_ID,
    };
  }

  async updateState() {
    let { selectedLGID, latLng } = this.state;
    const candidateList = await Candidate.listFromLG(selectedLGID);
    const lg = await LG.fromID(selectedLGID);
    const wardIdx = await Ward.idxFromLG(selectedLGID);

    if (!latLng) {
      latLng = await Geo.getLatLng();
    }

    this.setState({
      lg,
      candidateList,
      latLng,
      wardIdx,
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
    this.setState({ selectedLGID });
  }

  renderBody() {
    const { lg, candidateList, selectedLGID, wardIdx } = this.state;
    if (!lg) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <LGCandidateView candidateList={candidateList} wardIdx={wardIdx} />
      </Box>
    );
  }

  render() {
    const { lg, selectedLGID, latLng } = this.state;
    const keyLGDependent = "lg-dependent-" + selectedLGID;
    const keyLatLngDependent = "latlng-dependent-" + latLng;

    return (
      <Box sx={STYLE} key={keyLGDependent + keyLatLngDependent}>
        <Box sx={STYLE_HEADER}>
          <LGSelector
            selectedLGID={selectedLGID}
            onChangeLGID={this.onChangeLGID.bind(this)}
            latLng={latLng}
          />
        </Box>
        <Box style={STYLE_BODY}>{this.renderBody()}</Box>
        <CustomBottomNavigation />
      </Box>
    );
  }
}
