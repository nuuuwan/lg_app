import { WWW } from "@nuuuwan/utils-js-dev";

const URL = [
  "https://raw.githubusercontent.com",
  "nuuuwan",
  "kyc_elections_lk",
  "main",
  "data",
  "candidates.json",
].join("/");

export default class Candidate {
  constructor(districtID, lgID, party, wardName, name) {
    this.districtID = districtID;
    this.lgID = lgID;
    this.party = party;
    this.wardName = wardName;
    this.name = name;
  }

  static fromDict(d) {
    return new Candidate(
      d["district_id"],
      d["lg_id"],
      d["party_name"],
      d["ward_name"],
      d["name"]
    );
  }

  static async listAll() {
    const dList = await WWW.json(URL);
    return dList.map((d) => Candidate.fromDict(d));
  }

  static async listFromLG(lgID) {
    const cList = await Candidate.listAll();
    return cList.filter((c) => c.lgID === lgID);
  }
}
