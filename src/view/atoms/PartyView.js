import React from "react";
import Party from "../../nonview/core/Party";

import "./Clickable.css";

const STYLE = {
  padding: 2,
  textAlign: "center",
  borderRadius: "50%",
  fontSize: "80%",
  color: "gray",
  minWidth: 48,
};

const STYLE_IMG_SYMBOL = {
  width: 24,
  height: 24,
};

export default function PartyView({ partyName }) {
  const party = new Party(partyName);
  const symbol_src = party.symbol_src;
  let inner;
  if (symbol_src) {
    const styleImgSymbolCustom = { filter: `"hue-rotate(${party.hue}deg)"` };
    inner = (
      <img
        src={party.symbol_src}
        alt={partyName}
        style={{ ...STYLE_IMG_SYMBOL, ...styleImgSymbolCustom }}
      />
    );
  } else {
    inner = partyName;
  }

  const onClick = function () {
    const search_query = `${partyName} Sri Lanka Local Elections 2023`;
    const url = `https://www.google.com/search?q=${search_query}`;
    window.open(url, "_blank");
  };

  return (
    <div style={STYLE} onClick={onClick} className="clickable">
      {inner}
    </div>
  );
}
