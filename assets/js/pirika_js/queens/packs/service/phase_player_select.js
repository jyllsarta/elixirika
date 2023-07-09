export class PhasePlayerSelect {
  enter(state){
  }

  nextPhase(state){
    state.phase = "enemy_select";
  }
};
export default PhasePlayerSelect;
