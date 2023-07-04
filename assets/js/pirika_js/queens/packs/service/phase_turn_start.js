export class PhaseTurnStart {
  enter(state){
    state.round++;
  }

  nextPhase(state){
    state.phase = "player_select";
  }
};
export default PhaseTurnStart;
