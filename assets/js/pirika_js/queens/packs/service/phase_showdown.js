export class PhaseShowdown {
  enter(state){
  }

  nextPhase(state){
    state.phase = "turn_start";
  }
};
export default PhaseShowdown;
