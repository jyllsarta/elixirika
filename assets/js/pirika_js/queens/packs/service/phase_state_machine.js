import SetupPhase from "./setup_phase";

export class PhaseStateMachine {
  proceedToNextPhase(state){
    let phase = this.getNextPhase(state.phase);
    phase.enter(state);
  }

  getNextPhase(phaseName){
    switch(phaseName){
      case "unstarted":
      case "setup":
        return new SetupPhase();    
      default: 
        console.warn(`undefined phase ${phaseName}`);
        break;
    }
  }
};
export default PhaseStateMachine;
