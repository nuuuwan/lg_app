import React from "react";
import { Typography } from "@mui/material";
import { WARD_NUM_PR_LIST } from "../../nonview/core/Ward";


const STYLE_DIV_INFO = {
  color: "#888"
}

const STYLE_WARD_NUM = {
  fontSize: "50%",
  color: "#888",
};

const STYLE_WARD_NAME_ONLY = {
  fontSize: "60%",
  color: "#000",
  paddingLeft: 1,
};

const STYLE_ICON = {
  height: 12,
  color: "#888",
}

export default function WardName({ ward }) {
  if (parseInt(ward.wardNum) === WARD_NUM_PR_LIST) {
    return "Proportional List";
  }

  let memberText;
  if (ward.numMembers === 1) {
    memberText = "Single Member";
  } else {
    memberText = `Multi-Member (${ward.numMembers} Seats)`;
  }

  return (
    <div>
      <div style={STYLE_DIV_INFO}>
        <span>
          <ward.Icon style={STYLE_ICON} />                  
        </span>
        <span style={STYLE_WARD_NUM}>
          Ward{" " + ward.wardNum + " · "}{memberText}
        </span>
      </div>
      <div>
        <Typography sx={STYLE_WARD_NAME_ONLY}>{ward.wardName}</Typography>
      </div>
    </div>
  );
}
