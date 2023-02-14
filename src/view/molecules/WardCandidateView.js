import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import WardName from "../atoms/WardName";

import Party from "../../nonview/core/Party";
import PartyView from "../atoms/PartyView";

import CandidateNameList from "./CandidateNameList";
import CompactList from "./CompactList";

import "./WardCandidateView.css";

const STYLE = {
  margin: 1,
  padding: 1,
};

const STYLE_BULLET = {
  padding: 5,
  borderRadius: "100%",
  border: "1px solid #888",
};

const STYLE_TD = {
  padding: 0,
  margin: 0,
  paddingRight: 2,
  border: "none",
};

export default function WardCandidateView({ wardName, partyNameToNames }) {
  return (
    <Box sx={STYLE}>
      <Typography variant="h5">{<WardName wardName={wardName} />}</Typography>
      <CompactList>
        {Object.entries(partyNameToNames).map(function ([partyName, names]) {
          const key = wardName + "-" + partyName;
          return [
            <td key={key + "party"}>
              <PartyView partyName={partyName} />
            </td>,
            <td key={key + "name"}>
              <CandidateNameList names={names} />
            </td>,
          ];
        })}
      </CompactList>
    </Box>
  );
}
