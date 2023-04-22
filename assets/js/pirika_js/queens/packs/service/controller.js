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

  selectCardByCardId(cardId){
    if(this.state.uiState.selectSkillTarget){
      this._doUseSkillPlayer(cardId);
    }
    else{
      this._doSendToBoard(cardId);
    }
  }

  _doSendToBoard(cardId){
    if(this.state.playerBoard.cards.length >= 2){
      console.warn("already picked 2 cards");
      return;
    }
    const card = this.state.playerHand.pickByCardId(cardId);
    if(card){
      this.state.playerBoard.add(card);
    }
  }

  _doUseSkillPlayer(cardId){
    if(this.state.playerSpecialPoint < 2){
      console.warn("insufficient sp");
      this.state.uiState.selectSkillTarget = false;
      return;
    }
    const card = this.state.playerHand.pickByCardId(cardId);
    if(card){
      this.state.discard.add(card);
      this.state.playerHand.add(this.state.deck.draw());
      this.state.playerSpecialPoint -= 2;
    }
    this.state.uiState.selectSkillTarget = false;
  }

  useRejectDuplicateSkillPlayer(){
    if(this.state.playerSpecialPoint < 1){
      console.warn("insufficient sp");
      return;
    }
    this.state.playerBoard.sendAllCardsTo(state.playerHand);
    const duplications = this.state.playerHand.cards.filter(card => this.state.playerHand.cards.some(anotherCard => anotherCard.n == card.n && card.id !== anotherCard.id));
    if(duplications.length === 0){
      console.warn("no duplications");
      return;
    }
    for(let card of duplications){
      this.state.discard.add(this.state.playerHand.pickByCardId(card.id));
    }
    for(let i = 0; i < duplications.length; i++){
      state.playerHand.add(state.deck.draw());
    }
    this.state.playerSpecialPoint -= 1;
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

  toSkillSelectMode(){
    if(this.state.playerSpecialPoint < 2){
      console.warn("insufficient sp");
      this.state.uiState.selectSkillTarget = false;
      return;
    }
    this.state.uiState.selectSkillTarget = true;
  }
};
export default Controller;
