import React from "react";
import { Typography } from "@mui/material";

const STYLE_WARD_NUM = {
  fontSize: "50%",
  color: "#888",
};

const STYLE_WARD_NAME_ONLY = {
  fontSize: "100%",
  color: "#000",
};

export default function WardName({ wardName }) {
  if (wardName === "None") {
    return "Proportional List";
  }

  const words = wardName.split("-");
  const wardNum = parseInt(words[0]);
  const wardNameOnly = words.slice(1).join(" ");
  return (
    <div>
      <div>
        <Typography sx={STYLE_WARD_NUM}>Ward {wardNum}</Typography>
      </div>
      <div>
        <Typography sx={STYLE_WARD_NAME_ONLY}>{wardNameOnly}</Typography>
      </div>
    </div>
  );
}
