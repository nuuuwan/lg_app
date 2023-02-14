import { WWW } from "@nuuuwan/utils-js-dev";

const URL = [
  "https://raw.githubusercontent.com",
  "nuuuwan",
  "gig-data",
  "master",
  "ents",
  "lg.tsv",
].join("/");

const TYPE_TO_TYPE_LONG  ={
  'MC'  : 'Municipal Council',
  'UC'  : 'Urban Council',
  'PS'  : 'Pradeshiya Sabha',
}

export default class LG {
  constructor(id, name, districtID) {
    this.id = id;
    this.name = name;
    this.districtID = districtID;
  }

  static fromDict(d) {
    return new LG(d["id"], d["name"], d["district_id"]);
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
    return this.nameWords.slice(0, -1).join(' ')
  }

  get type() {
    return this.nameWords.slice(-1)[0]
  }

  get typeLong() {
    return TYPE_TO_TYPE_LONG[this.type];
  }
}
