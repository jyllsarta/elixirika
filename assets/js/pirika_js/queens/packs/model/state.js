import Field from "./field";
import Member from "./member";
import Masterdata from "../masterdata";

export class State {
  constructor(questId, playerParams){
    this.phase = "unstarted";
    this.questId = questId;
    this.quest = Masterdata.get("quests", questId);
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
    this.fieldEffectActivateCount = 0;
    this.enemySkillActivateCount = 0;
    this.turn = 0;
    this.uiState = {
      selectSkillTarget: false,
      selectingSkillId: null,
      isFieldEffect: false,
      currentScript: "",
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

  updateScript(script){
    this.uiState.currentScript = script;
  }
};
export default State;
