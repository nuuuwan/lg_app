import React from "react";
import { Typography } from "@mui/material";
import { WARD_NUM_PR_LIST } from "../../nonview/core/Ward";

const STYLE_DIV_INFO = {
  color: "#888",
};

const STYLE_WARD_NUM = {
  fontSize: "50%",
  color: "#888",
  padding: 3,
  paddingLeft: 20,
  
};

const STYLE_WARD_NAME_ONLY = {
  fontSize: "60%",
  color: "#000",
};

const STYLE_ICON = {
  height: 12,
  color: "#888",
};

export default function WardName({ ward }) {
  if (parseInt(ward.wardNum) === WARD_NUM_PR_LIST) {
    return (
      <div>
      <div style={STYLE_WARD_NAME_ONLY}>
        <ward.Icon style={STYLE_ICON} />
        {ward.wardName}
      </div>
      <div style={STYLE_WARD_NUM}>
          Candidates who are eligible to be elected via Proportional Representation
      </div>      
    </div>
    );
  }

  let memberText;
  if (ward.numMembers === 1) {
    memberText = "Single Member";
  } else {
    memberText = `Multi-Member (${ward.numMembers} Seats)`;
  }

  return (
    <div>
      <div style={STYLE_WARD_NAME_ONLY}>
        <ward.Icon style={STYLE_ICON} />
        {ward.wardName}
      </div>
      <div style={STYLE_WARD_NUM}>
          Ward{" No. " + ward.wardNum + " · "}{memberText}
      </div>      
    </div>
  );
}
