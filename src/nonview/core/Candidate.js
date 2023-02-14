import { WWW } from "@nuuuwan/utils-js-dev";
import { WARD_NUM_PR_LIST } from "./Ward";

const URL = [
  "https://raw.githubusercontent.com",
  "nuuuwan",
  "kyc_elections_lk",
  "main",
  "data",
  "candidates.json",
].join("/");

export default class Candidate {
  constructor(districtID, lgID, party, wardNum, name) {
    this.districtID = districtID;
    this.lgID = lgID;
    this.party = party;
    this.wardNum = wardNum;
    this.name = name;
  }

  static fromDict(d) {
    let wardNum = parseInt(d["ward_num"]);
    if (wardNum === 0) {
      wardNum = WARD_NUM_PR_LIST;
    }
    return new Candidate(
      d["district_id"],
      d["lg_id"],
      d["party"],
      wardNum,
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
