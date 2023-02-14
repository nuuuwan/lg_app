import React from 'react';

const STYLE_TR = {
  padding: 0,
  margin: 0,
  paddingRight: 2,
  border: "none",
};

export default function CompactList({children}) {
    return (
    <table>
      <tbody>
        {children.map(function (child, i) {
          const key = "item-" + i;
          return <tr key={key} style={STYLE_TR}>{child}</tr>;
        })}
      </tbody>
    </table>
  );
}