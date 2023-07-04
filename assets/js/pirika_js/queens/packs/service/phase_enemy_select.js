export class PhaseEnemySelect {
  enter(state){
  }

  nextPhase(state){
    state.phase = "turn_start";
  }
};
export default PhaseEnemySelect;
