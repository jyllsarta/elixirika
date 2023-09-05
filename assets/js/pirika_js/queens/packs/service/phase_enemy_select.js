export class PhaseEnemySelect {
  enter(state){
    if(state.player.breakConditions.length === 0){
      return;
    }
    if(state.enemy.currentAtk === 0){
      return;
    }
    const condition = state.player.breakConditions[0];
    condition.remainCount -= state.enemy.currentAtk;
    if(condition.remainCount <= 0){
      state.player.breakConditions.shift();
    }
    state.updateScript("enemyCombo", 1);
  }

  nextPhase(state){
    state.phase = "enemy_skill";
  }
};
export default PhaseEnemySelect;
