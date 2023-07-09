import Field from "./field";
import Member from "./member";

export class State {
  constructor(questId){
    this.phase = "unstarted";
    this.questId = questId;
    this.reset();
  }

  reset(){
    this.deck = new Field();
    this.discard = new Field();
    this.board = new Field();
    this.player = new Member(true);
    this.enemy = new Member(false);    
    this.uiState = {
      selectSkillTarget: false,
      selectingSkillId: null,
    };
  }
};
export default State;
