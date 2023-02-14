import React from "react";

import CandidateName from "../atoms/CandidateName";
import CompactList from "./CompactList";

export default function CandidateNameList({ names, style }) {
  return (
    <CompactList style={style}>
      {names.map(function (name, i) {
        const key = "name-" + i + "-" + name;
        return <CandidateName key={key} name={name} />;
      })}
    </CompactList>
  );
}
