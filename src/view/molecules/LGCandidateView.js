import React from "react";
import WardCandidateView from "./WardCandidateView";

export default function LGCandidateView({ candidateList }) {
  const idx = candidateList.reduce(function (idx, candidate) {
    const wardName = candidate.wardName;
    if (!idx[wardName]) {
      idx[wardName] = {};
    }
    idx[wardName][candidate.party] = candidate.name;
    return idx;
  }, {});

  return Object.entries(idx).map(function ([wardName, partyNameToName]) {
    const key = "ward-" + wardName;
    return (
      <WardCandidateView
        key={key}
        wardName={wardName}
        partyNameToName={partyNameToName}
      />
    );
  });
}
