import Field from "./field";
import Member from "./member";
import PersistentData from "./persistentData";

export class State {
  constructor(questId){
    this.phase = "unstarted";
    this.questId = questId;
    this.persistentData = new PersistentData(questId);
    this.reset();
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
      selectingSkillId: null,
      // 実際にはphase_game_end で代入されるのでここで適当なものが入っていてもOK
      prevPersistentData: new PersistentData(this.questId),
    };
  }
};
export default State;
