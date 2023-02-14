const PARTY_TO_HUE = {
  SLPP: 0,
  JJB: 0,
  UNP: 120,
  SJB: 105,
  SLFP: 240,
};

export default class Party {
  constructor(name) {
    this.name = name;
  }

  get color() {
    const hue = PARTY_TO_HUE[this.name];
    if (hue === undefined) {
      return "white";
    }
    const alpha = 0.2;
    return `hsla(${hue}, 100%, 50%, ${alpha})`;
  }
}
