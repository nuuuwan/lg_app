import React from "react";

import "./Clickable.css";

const STYLE_FIRST_NAMES = {
  color: "#888",
  fontSize: "50%",
};

const STYLE_LAST_NAME = {
  color: "#000",
  fontSize: "80%",
};

const STYLE_TD = {
  border: "none",
  padding: 0,
  margin: 0,
}

export default function CandidateName({ name }) {
  const words = name.split(" ");
  const firstNames = words.slice(0, -1).join(" ");
  const lastName = words.slice(-1)[0].toUpperCase();

  const onClick = function () {
    const search_query = `"${name}" Sri Lanka Local Elections 2023`;
    const url = `https://www.google.com/search?q=${search_query}`;
    window.open(url, "_blank");
  };

  return (
    <td onClick={onClick} className="clickable" style={STYLE_TD}>
      <span style={STYLE_LAST_NAME}>{lastName + " "}</span>
      <span style={STYLE_FIRST_NAMES}>{firstNames}</span>
    </td>
  );
}
