import Field from "./field";
import Member from "./member";

export class State {
  constructor(questId, playerParams){
    this.phase = "unstarted";
    this.questId = questId;
    this.playerParams = playerParams;
    this.reset();
  }

  reset(){
    this.deck = new Field();
    this.discard = new Field();
    this.board = new Field();
    this.player = new Member(true);
    this.enemy = new Member(false);
    this.fieldEffect = null;
    this.uiState = {
      selectSkillTarget: false,
      selectingSkillId: null,
    };
  }

  isGameEnd(){
    if(this.phase === "unstarted"){
      return false;
    }
    return this.isWin() || this.isLose();
  }

  isWin(){
    return this.enemy.breakConditions.length === 0;
  }

  isLose(){
    return this.player.breakConditions.length === 0;
  }
};
export default State;
