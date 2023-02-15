import React from "react";
import { DEFAULT_FONT_FAMILY } from "./DefaultStyles";
import PersonName from "../../nonview/core/PersonName";
import "./Clickable.css";

const STYLE_FIRST_NAMES = {
  color: "#888",
  fontSize: "50%",
  fontFamily: DEFAULT_FONT_FAMILY,
};

const STYLE_LAST_NAME = {
  color: "#000",
  fontSize: "80%",
  fontFamily: DEFAULT_FONT_FAMILY,
};

const STYLE_TD = {
  border: "none",
  padding: 0,
  margin: 0,
};

export default function CandidateName({ name }) {
  const personName = new PersonName(name);
  const firstNames = personName.firstNames;
  const lastName = personName.lastName.toUpperCase();

  const onClick = function () {
    const search_query = `${name} Sri Lanka`;
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
