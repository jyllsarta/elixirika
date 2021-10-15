let Deck = require("./deck");
let Board = require("./board");
let StagedField = require("./stagedField");
let Graveyard = require("./graveyard");
let Hand = require("./hand");
let StarPalette = require("./starPalette");
let CharacterFactory = require("./characterFactory");
let SeededRandom = require("./seededRandom");
let Chapter = require("./chapter");
const Challenge = require("./challenge");

module.exports = class Model {
  constructor(characterId, chapterId, seed) {
    this.initiate(characterId, chapterId, seed);
  }

  initiate(characterId, chapterId, seed){
    const characterFactory = new CharacterFactory();
    this.character = characterFactory.getCharacterById(characterId);
    this.characterId = characterId;
    this.chapter = new Chapter().getById(chapterId);
    this.chapterId = chapterId;
    this.challenge = new Challenge();
    this.seed = seed;
    this.deck = new Deck();
    this.board = new Board();
    this.stagedField = new StagedField();
    this.graveyard = new Graveyard();
    this.hand = new Hand();
    this.starPalette = new StarPalette();
    this.seededRandom = new SeededRandom(seed);
    this.selectingBoardIndex = 0;
    this.cardStackRule = this.character.getCallback("cardStackRule", this.chapter.index);
    this.operationHistory = [];
    this.clearedChallenges = [];

    this.onGameStart();
  }

  checkAndUpdateClearedChallenges(){
    this.clearedChallenges = this.challenge.clearedChallengeIds(this, this.chapter.challenge_ids);
  }

  onGameStart(){
    this.deck.shuffle(this.seededRandom);
    this.character.getCallback("onGameStart", this.chapter.index)(this.character, this);
  }

  // 手詰まり == デッキ枚数がゼロ && ステージングにもなし && すべての手札がどこにも出せない
  isStaleMate(){
    if(this.deck.field.cards.length !== 0){
      return false;
    }
    if(this.stagedField.field.cards.length !== 0){
      return false;
    }
    for(let handCard of this.hand.field.cards){
      for(let field of this.board.fields){
        if(this.cardStackRule(this.character, this, handCard, field)){
          return false;
        }
      }
    }
    return true;
  }
};
