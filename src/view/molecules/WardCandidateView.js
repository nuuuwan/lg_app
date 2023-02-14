import React from "react";
import { Paper, Typography } from "@mui/material";
import WardName from "../atoms/WardName";

import Party from "../../nonview/core/Party";
import PartyView from "../atoms/PartyView";
import ShowHide from "../organisms/ShowHide";

import CandidateNameList from "./CandidateNameList";
import CompactList from "./CompactList";

const STYLE = {
  margin: 5,
  paddingLeft: 10,
  width: "90%",
};

export default function WardCandidateView({ wardNum, ward, partyNameToNames }) {
  const partyNames = Party.sortPartyNames(Object.keys(partyNameToNames));

  return (
    <Paper style={STYLE} elevation={0}>
      <ShowHide>
        <Typography variant="h5">
          <WardName ward={ward} />
        </Typography>
        <CompactList>
          {partyNames.map(function (partyName) {
            const names = partyNameToNames[partyName];
            const key = wardNum + "-" + partyName;
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
      </ShowHide>
    </Paper>
  );
}
