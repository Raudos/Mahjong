import shortid from "shortid";

export default class PieceElement {
  static icons = [
    'Chun',
    'Haku',
    'Hatsu',
    'Man1',
    'Man2',
    'Man3',
    'Man4',
    'Man5',
    'Man6',
    'Man7',
    'Man8',
    'Nan',
    'Pei',
    'Pin1',
    'Pin2',
    'Pin3',
    'Pin4',
    'Pin5',
    'Pin5-Dora',
    'Pin6',
    'Pin7',
    'Pin8',
    'Pin9',
    'Shaa',
    'Sou1',
    'Sou2',
    'Sou3',
    'Sou4',
    'Sou5',
    'Sou5-Dora',
    'Sou6',
    'Sou7',
    'Sou8',
    'Sou9',
    'Ton',
  ];

  static checkForFilesIntegrity = () => {
    PieceElement.icons.forEach(name => {
      try {
        require(`../assets/pieces/${name}.svg`)
      } catch(e) {
        console.warn('Missing file for - ', name);
      }
    })
  }
  static generateIcon = () => PieceElement.icons[Math.floor(Math.random() * PieceElement.icons.length)];

  constructor() {
    this.id = shortid.generate();
    this.icon = PieceElement.generateIcon();
  }
};