import React, { Component } from "react";
import {
  Select,
  MenuItem,
  CircularProgress,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import LG from "../../nonview/core/LG";
import District from "../../nonview/core/District";
import { DEFAULT_FONT_FAMILY } from "../atoms/DefaultStyles";
import { MISSING_DISTRICT_IDS } from "../../nonview/core/District";
import Autocomplete from "@mui/material/Autocomplete";

const STYLE_DIV_DISTRICT = {
  color: "gray",
  fontSize: "50%",
};

const N_DISPLAY_CLOSEST = 5;

const STYLE_DIV_LG = {
  verticalAlign: "bottom",
};

function LGSelectorItem({ lg, district, selectedLGID }) {
  const isSelected = selectedLGID === lg.id;
  const fontSize = isSelected ? Math.min(30, 500 / lg.name.length) : 20;
  const styleCustom = { fontSize };
  return (
    <div>
      <div style={STYLE_DIV_DISTRICT}>{district.name + " District"}</div>
      <div style={STYLE_DIV_LG}>{lg.name + " "}</div>
    </div>
  );
}

const STYLE = { zIndex: 10_000, paddingTop: 10 };

const STYLE_TEXT_FIELD = { maxWidth: "95%" };

export default class LGSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { lgList: null, districtIdx: null };
  }

  async componentDidMount() {
    const { latLng } = this.props;
    const lgListRaw = await LG.listAll();
    const lgListFiltered = lgListRaw.filter(function (lg) {
      return !MISSING_DISTRICT_IDS.includes(lg.districtID);
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

    const districtIdx = await District.idxAll();
    this.setState({ lgList, districtIdx });
  }

  render() {
    const { lgList, districtIdx } = this.state;
    if (!lgList) {
      return <CircularProgress />;
    }

    const { selectedLGID, onChangeLGID } = this.props;
    const selectedLG = lgList.filter((lg) => lg.id === selectedLGID)[0];
    const selectedDistrict = districtIdx[selectedLG.districtID];

    const onChange = function (_, value) {
      const newLGID = value.id;
      onChangeLGID(newLGID);
    };

    return (
      <Box style={STYLE}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={lgList}
          getOptionLabel={(lg) => lg.name}
          value={selectedLG}
          sx={{ width: 300 }}
          onChange={onChange}
          renderInput={function (params) {
            return (
              <TextField
                {...params}
                label="Search for your Local Authority"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
                style={STYLE_TEXT_FIELD}
              />
            );
          }}
          renderOption={function (props, lg) {
            const district = districtIdx[lg.districtID];
            return (
              <li {...props}>
                <LGSelectorItem
                  lg={lg}
                  district={district}
                  selectedLGID={selectedLGID}
                />
              </li>
            );
          }}
        />
        <div>
          <span
            style={{
              fontSize: "60%",
              color: "#444",
              fontFamily: DEFAULT_FONT_FAMILY,
            }}
          >
            {selectedDistrict.name}
          </span>
          <span
            style={{
              fontSize: "60%",
              color: "#888",
              fontFamily: DEFAULT_FONT_FAMILY,
            }}
          >
            {" District"}
          </span>
        </div>
      </Box>
    );
  }
}
