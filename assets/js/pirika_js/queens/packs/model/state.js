import Field from "./field";
import Member from "./member";
import PersistentData from "./persistentData";

export class State {
  constructor(){
    this.phase = "unstarted";
    this.reset();
    this.persistentData = new PersistentData();
  }

  reset(){
    this.deck = new Field();
    this.discard = new Field();
    this.board = new Field();
    this.boardNext = new Field();
    this.player = new Member(true);
    this.enemy = new Member(false);    
    this.pot = 0;
    this.round = 0;
    this.lastRoundResult = "-";
    this.uiState = {
      selectSkillTarget: false,
      prevPersistentData: new PersistentData(),
    };
  }
};
export default State;
