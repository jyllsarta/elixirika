import { PhaseStateMachine } from "./phase_state_machine";

// コントローラーを通った操作は将来的に履歴を残せるようにする
export class Controller {
  constructor(state){
    this.state = state;
  }

  setup(){
    this.state.phase = "unstarted";
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

  sendToBoardByCardId(cardId){
    if(this.state.playerBoard.cards.length >= 2){
      console.warn("already picked 2 cards");
      return;
    }
    const card = this.state.playerHand.pickByCardId(cardId);
    if(card){
      this.state.playerBoard.add(card);
    }
  }

  unstage(cardId){
    const card = this.state.playerBoard.pickByCardId(cardId);
    if(card){
      this.state.playerHand.add(card);
    }
    else{
      console.warn("couldn't find card");
    }
  }

  changeCard(index){
    if(this.state.playerScore < 2){
      console.warn("insufficient MP");
      return;
    }
    const card = this.state.playerHand.pick(index);
    if(card){
      this.state.discard.add(card);
      this.state.playerHand.add(this.state.deck.draw());
      this.state.playerScore -= 2;
    }
  }
};
export default Controller;
