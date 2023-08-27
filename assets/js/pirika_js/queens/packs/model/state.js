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
    this.actionCount = 0;
    this.uiState = {
      selectSkillTarget: false,
      selectingSkillId: null,
      isFieldEffect: false,
      currentScript: "",
      markedActionCount: 0,
      currentScriptPriority: 0,
      clickCount: 0,
      enemyComboCount: 0,
      faceId: 1,
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

  updateScript(when, maybeOrder = 1){
    const priority = Masterdata.getOne("character_script_priorities", "key", when).priority;
    if(this.actionCount === this.uiState.markedActionCount && priority < this.uiState.currentScriptPriority){
      return;
    }

    const script = Masterdata.getByCondition("character_scripts", {when: when, character_id: this.quest.character_id, order: maybeOrder})[0];

    this.uiState.currentScript = script.message;
    this.uiState.markedActionCount = this.actionCount;
    this.uiState.currentScriptPriority = priority;
    this.uiState.faceId = script.face_id;
  }
};
export default State;
