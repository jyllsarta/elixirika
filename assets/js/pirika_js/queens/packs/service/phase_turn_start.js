export class PhaseTurnStart {
  enter(state){
  }

  nextPhase(state){
    state.phase = "enemy_select";
  }
};
export default PhaseTurnStart;
