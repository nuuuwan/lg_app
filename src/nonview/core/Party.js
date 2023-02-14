const PARTY_TO_HUE = {
  SLPP: 0,
  JJB: 0,
  UNP: 120,
  SJB: 105,
  SLFP: 240,
};

const PARTIES_WITH_IMAGES = ['ACMC', 'ACTC', 'AITC', 'AITM', 'CWC', 'EPDP', 'FSP', 'JJB', 'MNA', 'NC', 'SJB', 'SLFP', 'SLMC', 'SLPP', 'TNA', 'UNP']

export default class Party {
  constructor(name) {
    this.name = name;
  }

  get hue() {
    return PARTY_TO_HUE[this.name];
  }

  get color() {
    const hue = this.hue;
    if (hue === undefined) {
      return "white";
    }
    const alpha = 0.5;
    return `hsla(${hue}, 100%, 50%, ${alpha})`;
  }

  get symbol_src() {
    if (!PARTIES_WITH_IMAGES.includes(this.name)) {
      return undefined;
    }
    return process.env.PUBLIC_URL +  `/images/party_symbols/${this.name}.png`
  }
}
