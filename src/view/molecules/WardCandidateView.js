import React from "react";
import { Box, Typography } from "@mui/material";
import WardName from "../atoms/WardName";

import Party from "../../nonview/core/Party";
import PartyView from "../atoms/PartyView";

import CandidateNameList from "./CandidateNameList";
import CompactList from "./CompactList";

const STYLE = {
  padding: 10,
  marginBottom: 10,
  width: "90%",
}

export default function WardCandidateView({ wardName, partyNameToNames }) {
  const partyNames = Party.sortPartyNames(Object.keys(partyNameToNames));

  return (
    <Box style={STYLE}>
      <Typography variant="h5">{<WardName wardName={wardName} />}</Typography>
      <CompactList>
        {partyNames.map(function (partyName) {
          const names = partyNameToNames[partyName];
          const key = wardName + "-" + partyName;
          const backgroundColor = new Party(partyName).color;
          return [
            <td key={key + "party"}>
              <PartyView partyName={partyName} />
            </td>,
            <td key={key + "name"}>
              <CandidateNameList names={names} style={{ backgroundColor }} />
            </td>,
          ];
        })}
      </CompactList>
    </Box>
  );
}
