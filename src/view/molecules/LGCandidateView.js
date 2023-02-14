import React from "react";
import WardCandidateView from "./WardCandidateView";
import { WARD_NUM_PR_LIST } from "../../nonview/core/Ward";

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

  return sortedEntries.map(function ([wardNum, partyNameToNames]) {
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
}
