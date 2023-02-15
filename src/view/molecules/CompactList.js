import React from "react";

const STYLE_TABLE = {};

const STYLE_TR = {
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
