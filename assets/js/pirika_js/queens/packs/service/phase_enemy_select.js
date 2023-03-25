export class PhaseEnemySelect {
  enter(state){
  }

  nextPhase(state){
    state.phase = "player_select";
  }
};
export default PhaseEnemySelect;
