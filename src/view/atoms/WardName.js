import React from "react";
import { Typography } from "@mui/material";
import { WARD_NUM_PR_LIST } from "../../nonview/core/Ward";

const STYLE_WARD_NUM = {
  fontSize: "50%",
  color: "#888",
};

const STYLE_WARD_NAME_ONLY = {
  fontSize: "100%",
  color: "#000",
};

export default function WardName({ ward }) {
  if (parseInt(ward.wardNum) === WARD_NUM_PR_LIST) {
    return "Proportional List";
  }

  return (
    <div>
      <div>
        <Typography sx={STYLE_WARD_NUM}>Ward {ward.wardNum}</Typography>
      </div>
      <div>
        <Typography sx={STYLE_WARD_NAME_ONLY}>{ward.wardName}</Typography>
      </div>
    </div>
  );
}
