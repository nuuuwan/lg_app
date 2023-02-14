import React from "react";

const STYLE_FIRST_NAMES = {
  color: "#888",
  fontSize: "50%",
};

const STYLE_LAST_NAME = {
  color: "#000",
  fontSize: "80%",
};

export default function CandidateName({ name }) {
  const words = name.split(" ");
  const firstNames = words.slice(0, -1).join(" ");
  const lastName = words.slice(-1)[0].toUpperCase();

  const onClick = function () {
    const url = `https://www.google.com/search?q=${name}`;
    location.href = url;
  };

  return (
    <td onClick={onClick} className="td-clickable">
      <span style={STYLE_LAST_NAME}>{lastName + " "}</span>
      <span style={STYLE_FIRST_NAMES}>{firstNames}</span>
    </td>
  );
}
