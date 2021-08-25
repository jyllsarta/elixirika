let Deck = require("./deck");
let Board = require("./board");
let Graveyard = require("./graveyard");
let Hand = require("./hand");
let StarPalette = require("./starPalette");
module.exports = class Model {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.deck = new Deck();
    this.board = new Board();
    this.graveyard = new Graveyard();
    this.hand = new Hand();
    this.starPalette = new StarPalette();
    this.selectingBoardIndex = 0;
  }
};
