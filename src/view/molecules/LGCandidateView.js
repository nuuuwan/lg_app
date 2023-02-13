import React from "react";
import WardCandidateView from "./WardCandidateView";

export default function LGCandidateView({ candidateList }) {
  const idx = candidateList.reduce(function (idx, candidate) {
    const wardName = candidate.wardName;
    const party = candidate.party;
    if (!idx[wardName]) {
      idx[wardName] = {};
    }
    if (!idx[wardName][party]) {
      idx[wardName][party] = [];
    }
    idx[wardName][candidate.party].push(candidate.name);
    return idx;
  }, {});

  const sortedEntries = Object.entries(idx).sort(
    function ([wardName1, _], [wardName2, __]) {
      const wardNumber1 = parseInt(wardName1.split('-')[0]);
      const wardNumber2 = parseInt(wardName2.split('-')[0]);
      return wardNumber1 - wardNumber2;
    }
  );

  return sortedEntries.map(function ([wardName, partyNameToNames]) {
    const key = "ward-" + wardName;
    return (
      <WardCandidateView
        key={key}
        wardName={wardName}
        partyNameToNames={partyNameToNames}
      />
    );
  });
}
