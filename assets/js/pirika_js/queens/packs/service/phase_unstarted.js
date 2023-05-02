export class PhaseUnstarted {
  enter(state){
  }

  nextPhase(state){
    state.phase = "setup";
  }
};
export default PhaseUnstarted;
