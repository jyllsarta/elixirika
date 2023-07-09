export class PhaseTurnStart {
  enter(state){
  }

  nextPhase(state){
    state.phase = "player_select";
  }
};
export default PhaseTurnStart;
