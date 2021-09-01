let Deck = require("./deck");
let Board = require("./board");
let Graveyard = require("./graveyard");
let Hand = require("./hand");
let StarPalette = require("./starPalette");
let CharacterFactory = require("./characterFactory");
let SeededRandom = require("./seededRandom");

module.exports = class Model {
  constructor(characterId, seed) {
    this.initiate(characterId, seed);
  }

  initiate(characterId, seed){
    const characterFactory = new CharacterFactory();
    this.character = characterFactory.getCharacterById(characterId);
    this.characterId = characterId;
    this.seed = seed;
    this.deck = new Deck();
    this.board = new Board();
    this.graveyard = new Graveyard();
    this.hand = new Hand();
    this.starPalette = new StarPalette();
    this.seededRandom = new SeededRandom(seed);
    this.selectingBoardIndex = 0;

    this.onGameStart();
  }

  onGameStart(){
    this.deck.shuffle(this.seededRandom);
    this.character.onGameStart(this);
  }

  // 手詰まり == デッキ枚数がゼロ && すべての手札がどこにも出せない
  isStaleMate(){
    // 本当はこっちが先
    if(this.deck.field.cards.length !== 0){
      return false;
    }
    for(let handCard of this.hand.field.cards){
      for(let fieldIndex in this.board.fields){
        if(this.board.isStackable(handCard, fieldIndex)){
          return false;
        }
      }
    }
    return true;
  }
};
