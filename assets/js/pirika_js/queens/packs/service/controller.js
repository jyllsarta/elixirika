import { PhaseStateMachine } from "./phase_state_machine";

// コントローラーを通った操作は将来的に履歴を残せるようにする
export class Controller {
  constructor(state){
    this.state = state;
  }

  setup(){
    let psm = new PhaseStateMachine();
    psm.proceedToNextPhase(this.state);
  }

  nextPhase(){
    let psm = new PhaseStateMachine();
    psm.proceedToNextPhase(this.state);
  }

  sendToBoard(index){
    if(this.state.playerBoard.cards.length >= 2){
      console.warn("already picked 2 cards");
      return;
    }
    const card = this.state.playerHand.pick(index);
    if(card){
      this.state.playerBoard.add(card);
    }
  }
};
export default Controller;
