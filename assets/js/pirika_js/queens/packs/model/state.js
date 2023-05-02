import Field from "./field";

export class State {
  constructor(){
    this.phase = "unstarted";
    this.reset();
    this.persistentData = this.initializePersistentData();
  }

  reset(){
    this.deck = new Field();
    this.discard = new Field();
    this.enemyHand = new Field();
    this.enemyBoard = new Field();
    this.playerHand = new Field();
    this.playerBoard = new Field();
    this.board = new Field();
    this.boardNext = new Field();
    this.playerScore = 0;
    this.enemyScore = 0;
    this.playerSpecialPoint = 0;
    this.enemySpecialPoint = 0;
    this.pot = 0;
    this.round = 0;
    this.lastRoundResult = "-";
    this.uiState = {
      selectSkillTarget: false,
      prevPersistentData: this.initializePersistentData(),
    };
  }

  initializePersistentData(){
    return {
      enemyBankroll: 50,
      playerBankroll: 50,
      winCount: 0,
    }
  }
};
export default State;
