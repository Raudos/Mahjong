import shortid from "shortid";

export default class PieceElement {
  static icons = [
    'Man1',
    'Man2',
    'Man3',
    'Man4',
    'Man5',
    'Man6',
    'Man7',
    'Man8',
  ];

  static generateIcon = () => PieceElement.icons[Math.floor(Math.random() * PieceElement.icons.length)];

  constructor() {
    this.id = shortid.generate();
    this.icon = PieceElement.generateIcon();
  }
};