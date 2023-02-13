import React from "react";
import { Box, Typography , List, ListItem, ListItemText} from "@mui/material";
import WardName from "../atoms/WardName";
import PropTypes from "prop-types";

WardCandidateView.propTypes = {
  wardName: PropTypes.string,
  partyNameToNames: PropTypes.object,
};

const STYLE = {
  margin: 1,
  padding: 1,
};

const STYLE_BULLET = {
    padding: 5,
    borderRadius: "100%",
    border: "1px solid #888",
}


function getPartyColor(partyName) {
    const h = {
        'SLPP': 0,
        'JJB': 0,
        'UNP': 120,
        'SJB': 105,
        'SLFP': 240,
    }[partyName];

    if (h === undefined) {
      return 'white';
    }
    return `hsla(${h}, 100%, 50%, 0.1)`;
}


const STYLE_FIRST_NAMES = {
    color: '#888',
    fontSize: '50%',
}

const STYLE_LAST_NAME = {
    color: '#000',
    fontSize: '80%',
}

function renderName(name) {
    const words = name.split(" ");
    const firstNames = words.slice(0, -1).join(' ');
    const lastName = words.slice(-1)[0].toUpperCase();

    return (
        <td>
        <Typography component="span" sx={STYLE_LAST_NAME}>
            {lastName +', '}
        </Typography>
        <Typography component="span" sx={STYLE_FIRST_NAMES}>
            {firstNames}
        </Typography>
        </td>
    )
}


function renderNames(names) {
    return (
        <table><tbody>
            {
                names.map(
                    function(name) {
                        const key = name;
                        return (
                            <tr key={key}> {renderName(name)}</tr>
                        )
                    }
                )
            }
        </tbody></table>
    )
}


const STYLE_TR = {
  padding: 0,
  margin: 0,
  paddingRight: 2,
  border: 'none',
}

const STYLE_TD = {
  padding: 0,
  margin: 0,
  paddingRight: 2,
  border: 'none',
}

export default function WardCandidateView({ wardName, partyNameToNames }) {
  return (
    <Box sx={STYLE}>
      <Typography variant="h5">{<WardName wardName={wardName} />}</Typography>
      <table ><tbody>
          {Object.entries(partyNameToNames).map(function ([partyName, names]) {
            const backgroundColor = getPartyColor(partyName);
            const style = { ...STYLE_TD, ...{backgroundColor} };
            const key = partyName;
            return (
              <tr key={key} style={STYLE_TR}>
                <td style={style}>
                  <Typography variant="body1">
                    {partyName}
                  </Typography>
                </td>
                <td style={style}>
                  {renderNames(names)}
                </td>
              </tr>
            );
          })}
      </tbody></table>
    </Box>
  );
}
