import React from "react";
import WardCandidateView from "./WardCandidateView";

export default function LGCandidateView({ candidateList }) {
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
    return wardNumA - wardNumB;
  });

  return sortedEntries.map(function ([wardNum, partyNameToNames]) {
    const key = "ward-" + wardNum;
    return (
      <WardCandidateView
        key={key}
        wardNum={wardNum}
        partyNameToNames={partyNameToNames}
      />
    );
  });
}
