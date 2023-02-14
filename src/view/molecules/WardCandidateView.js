import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import WardName from "../atoms/WardName";

import Party from "../../nonview/core/Party";
import PartyView from "../atoms/PartyView";

import CandidateNameList from "./CandidateNameList";
import CompactList from "./CompactList";

export default function WardCandidateView({ wardName, partyNameToNames }) {
  return (
    <Box>
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
