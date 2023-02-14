import React from "react";

import CandidateName from "../atoms/CandidateName";
import CompactList from "./CompactList";
import PersonName from "../../nonview/core/PersonName";

export default function CandidateNameList({ names, style }) {
  return (
    <CompactList style={style}>
      {names.sort(PersonName.cmp).map(function (name, i) {
        const key = "name-" + i + "-" + name;
        return <CandidateName key={key} name={name} />;
      })}
    </CompactList>
  );
}
