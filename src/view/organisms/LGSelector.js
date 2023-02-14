import React, { Component } from "react";
import {
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Menu,
} from "@mui/material";
import LG from "../../nonview/core/LG";
import District from "../../nonview/core/District";

const DISPLAY_DISTRICT_IDS = [
  "LK-62",
  "LK-32",
  "LK-81",
  "LK-92",
  "LK-71",
  "LK-31",
  "LK-91",
  "LK-13",
  "LK-21",
  "LK-61",
  "LK-12",
  "LK-11",
];

const STYLE_DIV_LG = {
  color: "black",
  fontSize: "100%",
};

const STYLE_DIV_DISTRICT = {
  color: "gray",
  fontSize: "50%",
};

function LGSelectorMenuItemContent({ lg, district }) {
  return (
    <div>
      <div style={STYLE_DIV_DISTRICT}>{district.name + " District"}</div>
      <div style={STYLE_DIV_LG}>{lg.name}</div>
    </div>
  );
}

export default class LGSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { lgList: null, districtIdx: null };
  }

  async componentDidMount() {
    const lgListUnsorted = await LG.listAll();
    const lgList = lgListUnsorted
      .filter(function (lg) {
        return DISPLAY_DISTRICT_IDS.includes(lg.districtID);
      })
      .sort(function (lgA, lgB) {
        return lgA.name.localeCompare(lgB.name);
      });
    const districtIdx = await District.idx();
    this.setState({ lgList, districtIdx });
  }

  render() {
    const { lgList, districtIdx } = this.state;
    if (!lgList) {
      return <CircularProgress />;
    }

    const { selectedLGID, onChangeLGID } = this.props;

    const onChange = function (e) {
      const newLGID = e.target.value;
      onChangeLGID(newLGID);
    };

    return (
      <Box>
        <Select
          label="Local Authority"
          value={selectedLGID}
          onChange={onChange}
        >
          {lgList.map(function (lg) {
            const key = "menu-item-" + lg.id;
            const district = districtIdx[lg.districtID];
            return (
              <MenuItem key={key} value={lg.id}>
                <LGSelectorMenuItemContent lg={lg} district={district} />
              </MenuItem>
            );
          })}
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Box>
    );
  }
}
