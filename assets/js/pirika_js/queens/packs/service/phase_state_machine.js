import PhaseEnemySelect from "./phase_enemy_select";
import PhaseGameEnd from "./phase_game_end";
import PhasePlayerSelect from "./phase_player_select";
import PhaseSetup from "./phase_setup";
import PhaseShowdown from "./phase_showdown";
import PhaseTurnStart from "./phase_turn_start";
import PhaseUnstarted from "./phase_unstarted";

export class PhaseStateMachine {
  proceedToNextPhase(state){
    let phase = this.getPhaseModule(state.phase);
    phase.nextPhase(state);
    let nextPhase = this.getPhaseModule(state.phase);
    nextPhase.enter(state);
  }

  getPhaseModule(phaseName){
    switch(phaseName){
      case "unstarted":
        return new PhaseUnstarted();
      case "setup":
        return new PhaseSetup();
      case "turn_start":
        return new PhaseTurnStart();    
      case "enemy_select":
        return new PhaseEnemySelect();
      case "player_select":
        return new PhasePlayerSelect();    
      case "showdown":
        return new PhaseShowdown();    
      case "game_end":
        return new PhaseGameEnd();    
      default: 
        console.warn(`undefined phase ${phaseName}`);
        break;
    }
  }
};
export default PhaseStateMachine;
