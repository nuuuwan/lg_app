import React from "react";
import WardCandidateView from "./WardCandidateView";
import { WARD_NUM_PR_LIST } from "../../nonview/core/Ward";
import { Box, Alert, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { STYLE } from "../atoms/DefaultStyles";
import { LAST_UPDATED } from "../../nonview/core/Version";
import { SignalCellularConnectedNoInternet3BarOutlined } from "@mui/icons-material";

export default function LGCandidateView({ candidateList, wardIdx }) {
  const idx = candidateList.reduce(function (idx, candidate) {
    const wardNum = candidate.wardNum;
    const party = candidate.party;
    if (!idx[wardNum]) {
      idx[wardNum] = {};
    }
    if (!idx[wardNum][party]) {
      idx[wardNum][party] = [];
    }
    idx[wardNum][candidate.party].push(candidate.name);
    return idx;
  }, {});

  const sortedEntries = Object.entries(idx).sort(function (
    [wardNumA, _],
    [wardNumB, __]
  ) {
    if (parseInt(wardNumA) === WARD_NUM_PR_LIST) {
      return 1;
    }
    if (parseInt(wardNumB) === WARD_NUM_PR_LIST) {
      return -1;
    }
    const wardA = wardIdx[wardNumA];
    const wardB = wardIdx[wardNumB];
    return wardA.wardName.localeCompare(wardB.wardName);
  });

  const renderedList = sortedEntries.map(function ([
    wardNum,
    partyNameToNames,
  ]) {
    const key = "ward-" + wardNum;
    const ward = wardIdx[wardNum];
    return (
      <WardCandidateView
        key={key}
        wardNum={wardNum}
        ward={ward}
        partyNameToNames={partyNameToNames}
      />
    );
  });

  const sourceURL =
    "https://eservices.elections.gov.lk/pages/ec_ct_KYC_LGA.aspx";
  const link = (
    <a href={sourceURL} target="_blank" rel="noreferrer">
      {sourceURL}
    </a>
  );

  const authorURL = "https://twitter.com/nuuuwan";
  const author_link = (
    <a href={authorURL} target="_blank" rel="noreferrer">
      @nuuuwan
    </a>
  );

  const onClickRefresh = function () {
    localStorage.clear();
    window.location.reload();
  };

  const codeURL = "https://github.com/nuuuwan/lg_app";
  const codeLink = (
    <a href={codeURL} target="_blank" rel="noreferrer">
      {codeURL}
    </a>
  );

  return (
    <Box>
      {renderedList}
      <br />

      <Alert severity="info" sx={STYLE}>
        This app uses data from {link}. The source has some spelling and other
        errors.
        <br />
        <br />
        Also, the scraping process could have errors. Please report bugs to{" "}
        {author_link}.
      </Alert>
      <br />

      <Alert severity="warning" sx={STYLE}>
        The App shows candidates for
        <strong>all </strong>Administrative Districts, including{" "}
        <strong>Ampara</strong>, which was not available in previous versions.
        <br />
        <br />
        If you have used the app before, you might need to refresh the app
        before you see updates.
        <br />
        <br />
        <Button
          variant="outlined"
          endIcon={<RefreshIcon />}
          onClick={onClickRefresh}
        >
          Refresh App
        </Button>
      </Alert>
      <br />

      <Alert severity="info" sx={STYLE}>
        Your version of the app was last updated on {LAST_UPDATED}.
        <br />
        <br />
        Code: {codeLink}
      </Alert>
    </Box>
  );
}
