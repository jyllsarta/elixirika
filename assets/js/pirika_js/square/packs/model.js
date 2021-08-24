let Deck = require("./deck");
let Board = require("./Board");
let Graveyard = require("./Graveyard");
let Hand = require("./Hand");
let Selecting = require("./Selecting");
let StarPalette = require("./StarPalette");
module.exports = class Model {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.deck = new Deck();
    this.board = new Board();
    this.graveyard = new Graveyard();
    this.hand = new Hand();
    this.selecting = new Selecting();
    this.starPalette = new StarPalette();
  }
};
