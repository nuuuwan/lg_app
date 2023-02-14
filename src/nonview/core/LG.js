import { WWW } from "@nuuuwan/utils-js-dev";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import LandscapeIcon from "@mui/icons-material/Landscape";

const URL = [
  "https://raw.githubusercontent.com",
  "nuuuwan",
  "gig-data",
  "master",
  "ents",
  "lg.tsv",
].join("/");

const TYPE_TO_TYPE_LONG = {
  MC: "Municipal Council",
  UC: "Urban Council",
  PS: "Pradeshiya Sabha",
};

export default class LG {
  constructor(id, name, provinceID, districtID, latLng, population) {
    this.id = id;
    this.name = name;
    this.provinceID = provinceID;
    this.districtID = districtID;
    this.latLng = latLng;
    this.population = population;
  }

  static fromDict(d) {
    return new LG(
      d["id"],
      d["name"],
      d["province_id"],
      d["district_id"],
      JSON.parse(d["centroid"]),
      parseInt(d["population"])
    );
  }

  static async fromID(id) {
    const idx = await LG.idx();
    return idx[id];
  }

  static async listAll() {
    const dList = await WWW.tsv(URL);
    return dList.map((d) => LG.fromDict(d));
  }

  static async idx() {
    const dList = await LG.listAll();
    const idx = {};
    dList.forEach((e) => {
      idx[e.id] = e;
    });
    return idx;
  }

  get nameWords() {
    return this.name.split(" ");
  }

  get nameOnly() {
    return this.nameWords.slice(0, -1).join(" ");
  }

  get type() {
    return this.nameWords.slice(-1)[0];
  }

  get typeLong() {
    return TYPE_TO_TYPE_LONG[this.type];
  }

  get Icon() {
    return {
      MC: LocationCityIcon,
      UC: HolidayVillageIcon,
      PS: LandscapeIcon,
    }[this.type];
  }
}
