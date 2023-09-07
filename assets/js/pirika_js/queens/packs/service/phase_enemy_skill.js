import Masterdata from "../masterdata";
import SkillFacade from "./skill_facade";

export class PhaseEnemySkill {
  enter(state){

  }

  defaultDelay(){
    return 100;
  }

  needsContinue(state){
    return this._canInvokeEnemySkill(state) && state.enemySkillActivateCount < 1;
  }

  continue(state, controller){
    const skills = Masterdata.getBy("skills", "id", state.enemy.skillIds);
    const sf = new SkillFacade();
    const skill = skills.find(skill => sf.canInvoke(state, state.enemy, skill.id, null));
    if(!skill){
      console.warn("couldn't invoke skill");
      return;
    }
    sf.invoke(state, state.enemy, skill.id, null);
    state.enemySkillActivateCount += 1;
    state.updateScript("enemySkill");
    return {invokedSkillId: skill.id, delay: 1000}
  }

  nextPhase(state){
    state.board.sendAllCardsTo(state.discard);
    state.enemy.buffState.turnDecay();
    state.player.buffState.turnDecay();
    state.enemySkillActivateCount = 0;
    state.uiState.enemyComboCount = 0;
    state.enemy.stunTurn > 0 && state.enemy.stunTurn--;
    state.enemy.brokeCount = 0;
    state.turn += 1;
    state.phase = "turn_start";
  }

  _canInvokeEnemySkill(state){
    const skills = Masterdata.getBy("skills", "id", state.enemy.skillIds);
    const sf = new SkillFacade();
    return skills.some(skill => sf.canInvoke(state, state.enemy, skill.id, null));
  }
};
export default PhaseEnemySkill;
