import React, { Component } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import CustomBottomNavigation from "../organisms/CustomBottomNavigation";
import LGCandidateView from "../molecules/LGCandidateView";

import Candidate from "../../nonview/core/Candidate";
import LG from "../../nonview/core/LG";

const DEFAULT_LG_ID = "LG-11001";

const STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  padding: 2,
  overflow: "scroll",
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lgID: DEFAULT_LG_ID,
      candidateList: null,
      lg: null,
    };
  }

  async componentDidMount() {
    const { lgID } = this.state;
    const candidateList = await Candidate.listFromLG(lgID);
    const lg = await LG.fromID(lgID);
    this.setState({
      lg,
      candidateList,
    });
  }

  render() {
    const { lg, candidateList } = this.state;
    if (!lg) {
      return <CircularProgress />;
    }
    return (
      <Box sx={STYLE}>
        <Typography variant="subtitle">
          {"2023 Sri Lanka Local Elections Candidates"}
        </Typography>
        <Typography variant="h3">{lg.name}</Typography>
        <LGCandidateView candidateList={candidateList} />
        <CustomBottomNavigation />
      </Box>
    );
  }
}
