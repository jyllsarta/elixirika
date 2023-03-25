export class PhaseGameEnd {
  enter(state){
  }

  nextPhase(state){
    state.phase = "unstarted";
  }
};
export default PhaseGameEnd;
