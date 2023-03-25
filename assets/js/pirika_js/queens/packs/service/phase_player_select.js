export class PhasePlayerSelect {
  enter(state){
  }

  nextPhase(state){
    state.phase = "showdown";
  }
};
export default PhasePlayerSelect;
