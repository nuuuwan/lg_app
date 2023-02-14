import { WWW } from "@nuuuwan/utils-js-dev";

const URL = [
  "https://raw.githubusercontent.com",
  "nuuuwan",
  "gig-data",
  "master",
  "ents",
  "district.tsv",
].join("/");

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
