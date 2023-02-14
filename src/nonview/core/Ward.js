import { WWW } from "@nuuuwan/utils-js-dev";

import Person2Icon from "@mui/icons-material/Person2";
import GroupIcon from "@mui/icons-material/Group";
import Groups2Icon from "@mui/icons-material/Groups2";
import ListIcon from "@mui/icons-material/List";

export const WARD_NUM_PR_LIST = 10_000;

const URL_BASE = [
  "https://raw.githubusercontent.com",
  "nuuuwan",
  "kyc_elections_lk",
  "main",
  "data",
  "lg_wards_by_lg",
].join("/");

export default class Ward {
  constructor(lgID, wardNum, wardName, numMembers) {
    this.lgID = lgID;
    this.wardNum = wardNum;
    this.wardName = wardName;
    this.numMembers = numMembers;
  }

  get Icon() {
    if (this.wardNum === WARD_NUM_PR_LIST) {
      return ListIcon;
    } else if (this.numMembers === 1) {
      return Person2Icon;
    } else if (this.numMembers === 2) {
      return GroupIcon;
    } else {
      return Groups2Icon;
    }
  }

  static fromDict(d) {
    return new Ward(
      d["lg_id"],
      parseInt(d["ward_num"]),
      d["ward_name"],
      parseInt(d["n_members"])
    );
  }

  static constructPRWard(lgID) {
    return new Ward(lgID, WARD_NUM_PR_LIST, "Proportional List", 0);
  }

  static async listFromLG(lgID) {
    const url = `${URL_BASE}/${lgID}.json`;
    const dList = await WWW.json(url);
    return dList.map((d) => Ward.fromDict(d));
  }

  static async idxFromLG(lgID) {
    const wardList = await Ward.listFromLG(lgID);
    const idx = {};
    for (const ward of wardList) {
      idx[ward.wardNum] = ward;
    }
    idx[WARD_NUM_PR_LIST] = Ward.constructPRWard(lgID);
    return idx;
  }
}
