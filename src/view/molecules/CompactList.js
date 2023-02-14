import React from "react";

const STYLE_TABLE = {
  padding: 0,
  margin: 0,
};

const STYLE_TR = {
  padding: 0,
  margin: 0,
  paddingRight: 2,
  border: "none",
  verticalAlign: "middle",
};

export default function CompactList({ children, style }) {
  return (
    <table style={{ ...STYLE_TABLE, ...style }}>
      <tbody>
        {children.map(function (child, i) {
          const key = "item-" + i;
          return (
            <tr key={key} style={STYLE_TR}>
              {child}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
