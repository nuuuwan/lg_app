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

const STYLE_DIV_DISTRICT = {
  color: "gray",
  fontSize: "50%",
};

const STYLE_SPAN_LG_NAME_ONLY = {
  color: "black",
  fontSize: "100%",
};

const N_DISPLAY_CLOSEST = 5;

const STYLE_SPAN_LG_TYPE = STYLE_DIV_DISTRICT;

const STYLE_SPAN_LG_ICON = {
  color: "#888",
};

const STYLE_LG_ICON = {
  height: 12,
};

const STYLE_DIV_LG = {
  verticalAlign: "bottom",
};

function LGSelectorMenuItemContent({ lg, district }) {
  return (
    <div>
      <div style={STYLE_DIV_DISTRICT}>{district.name + " District"}</div>
      <div style={STYLE_DIV_LG}>
        <span style={STYLE_SPAN_LG_ICON}>
          <lg.Icon style={STYLE_LG_ICON} />
        </span>
        <span style={STYLE_SPAN_LG_NAME_ONLY}>{lg.nameOnly + " "}</span>
        <span style={STYLE_SPAN_LG_TYPE}>{lg.typeLong}</span>
      </div>
    </div>
  );
}

export default class LGSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { lgList: null, districtIdx: null };
  }

  async componentDidMount() {
    const { latLng } = this.props;
    const lgListRaw = await LG.listAll();
    const lgListFiltered = lgListRaw.filter(function (lg) {
      return DISPLAY_DISTRICT_IDS.includes(lg.districtID);
    });

    let lgListRemainder;
    let lgList;
    if (latLng) {
      const lgListSortedByDistance = lgListFiltered.sort(function (lgA, lgB) {
        const latLngA = lgA.latLng;
        const latLngB = lgB.latLng;
        const distA2 =
          Math.pow(latLngA[0] - latLng[0], 2) +
          Math.pow(latLngA[1] - latLng[1], 2);
        const distB2 =
          Math.pow(latLngB[0] - latLng[0], 2) +
          Math.pow(latLngB[1] - latLng[1], 2);
        return distA2 - distB2;
      });

      lgList = lgListSortedByDistance.slice(0, N_DISPLAY_CLOSEST);
      lgListRemainder = lgListSortedByDistance.slice(N_DISPLAY_CLOSEST);
    } else {
      lgList = [];
      lgListRemainder = lgListFiltered;
    }

    lgList = [].concat(
      lgList,
      lgListRemainder.sort(function (lgA, lgB) {
        return lgA.name.localeCompare(lgB.name);
      })
    );

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
        </Select>
      </Box>
    );
  }
}
