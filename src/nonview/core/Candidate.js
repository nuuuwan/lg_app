import WWW from "@nuuuwan-utils-js";

const URL = [
  "https://raw.githubusercontent.com",
  "nuuuwan",
  "kyc_elections_lk",
  "main",
  "data",
  "candidates.json",
].join("/");

export default class Candidate {
  constructor(districtID, lgID, party, wardName, candidateName) {
    this.districtID = districtID;
    this.lgID = lgID;
    this.party = party;
    this.wardName = wardName;
    this.candidateName = candidateName;
  }

  static listAll() {
    const dList = WWW.json(url);
    return null;
  }
}
