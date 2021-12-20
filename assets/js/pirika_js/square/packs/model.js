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
const MessageManager = require("./message_manager");

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
    this.messageManager = new MessageManager(this);
    this.seed = seed;
    this.deck = new Deck();
    this.board = new Board();
    this.stagedField = new StagedField();
    this.graveyard = new Graveyard();
    this.hand = new Hand();
    this.starPalette = new StarPalette();
    this.seededRandom = new SeededRandom(seed);
    this.selectingBoardIndex = -1;
    this.cardStackRule = this.character.getCallback("cardStackRule", this.chapter.index);
    this.operationHistory = [];
    this.clearedChallenges = [];
    this.isForceStaleMate = false;

    this.onGameStart();
  }

  checkAndUpdateClearedChallenges(){
    const updatedChallengeIds = this.challenge.clearedChallengeIds(this, this.chapter.challenge_ids);
    if(this.clearedChallenges.length < updatedChallengeIds.length){
      this.messageManager.register("challenge");
    }
    this.clearedChallenges = updatedChallengeIds;
  }

  onGameStart(){
    this.deck.shuffle(this.seededRandom);
    this.character.getCallback("onGameStart", this.chapter.index)(this.character, this);
    this.messageManager.register("gameStart");
  }

  currentScore(){
    return this.character.getCallback("calculateScore", this.chapter.index)(this.character, this);
  }

  // 特殊効果による手詰まり is isForceStalemate == true この場合は他の条件に関係なくとにかくtrue
  // カード状況による手詰まり is デッキ枚数がゼロ && 手札にもステージングにもsenderがない && スキル経由でsenderの供給が不可能
  isStaleMate(){
    if(this.isForceStaleMate){
      return true;
    }
    const isDeckEmpty = this.deck.field.cards.length == 0;
    const noSenderOnHand =        this.hand.field.cards.every(card=>card.category !== "sender");
    const noSenderOnStagedField = this.stagedField.field.cards.every(card=>card.category !== "sender");
    const cannotGetSenderFromSkill = !this.character.getCallback("canGetSenderCardFromSkill", this.chapter.index)(this.character, this);
    return isDeckEmpty && noSenderOnHand && noSenderOnStagedField && cannotGetSenderFromSkill;
  }
};
