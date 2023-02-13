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
    return {
        'SLPP': '#800',
        'JJB': '#f00',
        'UNP': '#080',
        'SJB': '#4c0',
        'SLFP': '#008',
    }[partyName] || "white";
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
        <ListItemText>
        <Typography component="span" sx={STYLE_LAST_NAME}>
            {lastName +', '}
        </Typography>
        <Typography component="span" sx={STYLE_FIRST_NAMES}>
            {firstNames}
        </Typography>
        </ListItemText>
    )
}


function renderNames(names) {
    return (
        <List disablePadding >
            {
                names.map(
                    function(name) {
                        const key = name;
                        return (
                            <ListItem key={key} button={true}> {renderName(name)}</ListItem>
                        )
                    }
                )
            }
        </List>
    )
}


const STYLE_TD = {
  padding: 0,
  margin: 0,
  paddingRight: 2,
}

export default function WardCandidateView({ wardName, partyNameToNames }) {
  return (
    <Box sx={STYLE}>
      <Typography variant="h5">{<WardName wardName={wardName} />}</Typography>
      <List >
          {Object.entries(partyNameToNames).map(function ([partyName, names]) {
            const key = "party-" + partyName;
            const backgroundColor = getPartyColor(partyName);
            const styleBullet = Object.assign({}, STYLE_BULLET, {backgroundColor} );
            return (
              <ListItem key={key} >
                <span style={styleBullet} />
                <span style={STYLE_TD}>
                  <Typography key={key} variant="body1">
                    {partyName}
                  </Typography>
                </span>
                <span style={STYLE_TD}>
                  {renderNames(names)}
                </span>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
}
