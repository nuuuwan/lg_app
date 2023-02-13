import React from "react";
import { Paper, Typography } from "@mui/material";
import WardName from "../atoms/WardName";
import PropTypes from "prop-types";

WardCandidateView.propTypes = {
  wardName: PropTypes.string,
  partyNameToName: PropTypes.object,
};

const STYLE = {
  margin: 1,
  padding: 1,
};

const STYLE_BULLET = {
    padding: 10,
    borderRadius: "100%",
    border: '1px solid #ccc',
}


function getPartyColor(partyName) {
    return {
        'SLPP': '#800',
        'JJB': '#f00',
        'UNP': '#080',
        'NDF': '#4c0',
        'SLFP': '#008',
    }[partyName] || "white";
}

export default function WardCandidateView({ wardName, partyNameToName }) {
  return (
    <Paper sx={STYLE}>
      <Typography variant="h5">{<WardName wardName={wardName} />}</Typography>
      <table>
        <tbody>
          {Object.entries(partyNameToName).map(function ([partyName, name]) {
            const key = "party-" + partyName;
            const backgroundColor = getPartyColor(partyName);
            const styleBullet = Object.assign({}, STYLE_BULLET, {backgroundColor} );
            return (
              <tr key={key}>
                <td>
                    <div style={styleBullet} />
                </td>
                <td>
                  <Typography key={key} variant="body1">
                    {partyName}
                  </Typography>
                </td>
                <td>
                  <Typography key={key} variant="body1">
                    {name}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Paper>
  );
}
