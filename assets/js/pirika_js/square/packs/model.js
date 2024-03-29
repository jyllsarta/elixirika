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
const SoundManager = require("./sound_manager");
const Constants = require("./constants");

module.exports = class Model {
  constructor(characterId, chapterId, seed) {
    this.initiate(characterId, chapterId, seed);
  }

  initiate(characterId, chapterId, seed) {
    const characterFactory = new CharacterFactory();
    this.character = characterFactory.getCharacterById(characterId);
    this.characterId = characterId;
    this.chapter = new Chapter().getById(chapterId);
    this.chapterId = chapterId;
    this.challenge = new Challenge();
    this.messageManager = new MessageManager(this);
    this.soundManager = new SoundManager();
    this.seed = seed;
    this.deck = new Deck();
    this.board = new Board();
    this.stagedField = new StagedField();
    this.graveyard = new Graveyard();
    this.hand = new Hand();
    this.starPalette = new StarPalette();
    this.seededRandom = new SeededRandom(seed);
    this.selectingBoardIndex = -1;
    this.cardStackRule = this.character.getCallback(
      "cardStackRule",
      this.chapter.index,
    );
    this.operationHistory = [];
    this.clearedChallenges = [];
    this.isForceStalemate = false;
    this.isGracefullyStalemate = false;
    this.forceStalemateReason = "";
    this.focusingAbilityIndex = -1;
    this.score = 0;

    this.onGameStart();
  }

  checkAndUpdateClearedChallenges() {
    const updatedChallengeIds = this.challenge.clearedChallengeIds(
      this,
      this.chapter.challenge_ids,
    );
    if (this.clearedChallenges.length < updatedChallengeIds.length) {
      this.messageManager.register("challenge");
    }
    this.clearedChallenges = updatedChallengeIds;
  }

  onGameStart() {
    this.deck.shuffle(this.seededRandom);
    this.character.getCallback("onGameStart", this.chapter.index)(
      this.character,
      this,
    );
    this.messageManager.register("gameStart");
  }

  calculateScore() {
    const starPaletteScore = this.starPalette.score();
    const restCardScore = this.restCardBonus();

    this.score = starPaletteScore + restCardScore;
  }

  restCardBonus() {
    const isClearedMainTarget = this.character.getCallback(
      "isClearedMainTarget",
      this.chapter.index,
    )(this.character, this);
    if (isClearedMainTarget) {
      return this.deck.field.cards.length * Constants.restCardBonus;
    }
    return 0;
  }

  // 特殊効果による手詰まり is isForceStalemate == true この場合は他の条件に関係なくとにかくtrue
  // 特殊効果による手詰まり is isForceStalemate == true この場合は他の条件に関係なくとにかくtrue
  // カード状況による手詰まり is デッキ枚数がゼロ && 手札にもステージングにもsenderがない && スキル経由でsenderの供給が不可能
  isStalemate() {
    if (this.isForceStalemate || this.isGracefullyStalemate) {
      return true;
    }
    return false;
  }

  setForceStalemate(reason, isGood) {
    if (isGood) {
      this.messageManager.register("gracefullyStalemate");
      this.isGracefullyStalemate = true;
    } else {
      this.messageManager.register("forceStalemate");
    }
    this.isForceStalemate = true;
    this.forceStalemateReason = reason;
    this.checkAndUpdateClearedChallenges();
    if (isGood) {
      this.soundManager.register("end");
    } else {
      this.soundManager.register("bad");
    }
  }

  // タッチ・ドラッグに関わらず今握っているカードを取得することを試みる(無選択があり得る)
  getHoldingCard() {
    if (this.stagedField.isStaged()) {
      return this.stagedField.field.cards[0];
    }
    if (this.hand.isNoCardSelected()) {
      return null;
    }
    return this.hand.field.cards.find((card) => card.selected);
  }

  registerOperationHistory(history) {
    // 選び直し系が連続した場合、最後のヒストリーのみを記録する
    const lastOperationHistory = this.operationHistory.slice(-1)[0];
    if (
      lastOperationHistory &&
      lastOperationHistory.name === "selectHand" &&
      history.name === "selectHand"
    ) {
      this.operationHistory.pop();
    }
    if (
      lastOperationHistory &&
      lastOperationHistory.name === "selectBoard" &&
      history.name === "selectBoard"
    ) {
      this.operationHistory.pop();
    }
    if (this.operationHistory.length > 1000) {
      console.warn(
        `operation history reached ${this.operationHistory.length}! may refused by server`,
      );
    }
    this.operationHistory.push(history);
  }
};
