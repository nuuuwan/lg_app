import { WWW } from "@nuuuwan/utils-js-dev";

const URL = [
  "https://raw.githubusercontent.com",
  "nuuuwan",
  "gig-data",
  "master",
  "ents",
  "district.tsv",
].join("/");

export const DISPLAY_DISTRICT_IDS = [
  "LK-11",
  "LK-12",
  "LK-61",
  "LK-21",
  "LK-13",
  "LK-91",
  "LK-31",
  "LK-71",
  "LK-92",
  "LK-81",
  "LK-32",
  "LK-62",
  "LK-23",
  "LK-33",
  "LK-41",
  "LK-51",
  "LK-22",
  "LK-82",
  'LK-72',
  'LK-53',
  'LK-43',
  'LK-45',
  'LK-42',
];



export const DISPLAY_DISTRICT_NAMES = [
  "Colombo",
  "Gampaha",
  "Kurunegala",
  "Kandy",
  "Kalutara",
  "Ratnapura",
  "Galle",
  "Anuradhapura",
  "Kegalle",
  "Badulla",
  "Matara",
  "Puttalam",
  "Nuwara Eliya",
  "Hambantota",
  "Jaffna",
  "Batticaloa",
  "Matale",
  "Moneragala",
  'Polonnaruwa',
  'Trincomalee',
  'Vavuniya',
  'Kilinochchi',
  'Mannar',
];

export default class District {
  constructor(id, name, districtID) {
    this.id = id;
    this.name = name;
  }

  static fromDict(d) {
    return new District(d["id"], d["name"], d["district_id"]);
  }

  static async fromID(id) {
    const idx = await District.idx();
    return idx[id];
  }

  static async listAll() {
    const dList = await WWW.tsv(URL);
    return dList.map((d) => District.fromDict(d));
  }

  static async idx() {
    const dList = await District.listAll();
    const idx = {};
    dList.forEach((e) => {
      idx[e.id] = e;
    });
    return idx;
  }
}
