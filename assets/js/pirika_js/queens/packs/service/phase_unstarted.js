export class PhaseUnstarted {
  enter(state){
    console.warn("unstarted ステートへの遷移は想定外")
  }

  nextPhase(state){
    state.phase = "setup";
  }
};
export default PhaseUnstarted;
