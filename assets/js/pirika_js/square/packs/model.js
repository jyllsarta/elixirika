let Deck = require("./deck");
let Board = require("./board");
let Graveyard = require("./graveyard");
let Hand = require("./hand");
let StarPalette = require("./starPalette");
let CharacterFactory = require("./characterFactory");
module.exports = class Model {
  constructor(characterId, seed) {
    this.initiate(characterId, seed);
  }

  initiate(characterId, seed){
    const characterFactory = new CharacterFactory();
    this.character = characterFactory.getCharacterById(characterId);
    this.seed = seed;
    this.deck = new Deck();
    this.board = new Board();
    this.graveyard = new Graveyard();
    this.hand = new Hand();
    this.starPalette = new StarPalette();
    this.selectingBoardIndex = 0;

    this.onGameStart();
  }

  onGameStart(){
    this.deck.shuffle(this.seed);
    this.character.onGameStart(this);
  }
};
