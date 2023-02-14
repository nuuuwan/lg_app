import React from "react";
import Party from "../../nonview/core/Party";

const STYLE = {
  padding: 2,
  textAlign: "center",
  borderRadius: "100%",
}

export default function PartyView({ partyName }) {
  const backgroundColor = (new Party(partyName)).color;
  const style = {...{backgroundColor},...STYLE}
  return <div style={style}>{partyName}</div>;
}
