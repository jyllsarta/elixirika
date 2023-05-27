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
    if(this.state.player.board.cards.length >= 2){
      console.warn("already picked 2 cards");
      return;
    }
    const card = this.state.player.hand.pick(index);
    if(card){
      this.state.player.board.add(card);
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
    if(this.state.player.board.cards.length >= 2){
      console.warn("already picked 2 cards");
      return;
    }
    const card = this.state.player.hand.pickByCardId(cardId);
    if(card){
      this.state.player.board.add(card);
    }
  }

  _doUseSkillPlayer(cardId){
    if(this.state.player.specialPoint < 2){
      console.warn("insufficient sp");
      this.state.uiState.selectSkillTarget = false;
      return;
    }
    const card = this.state.player.hand.pickByCardId(cardId);
    if(card){
      this.state.discard.add(card);
      this.state.player.hand.add(this.state.deck.draw());
      this.state.player.hand.cards.forEach(card => card.reveal());
      this.state.player.specialPoint -= 2;
    }
    this.state.uiState.selectSkillTarget = false;
  }

  useRejectDuplicateSkillPlayer(){
    if(this.state.player.specialPoint < 2){
      console.warn("insufficient sp");
      return;
    }
    this.state.player.board.sendAllCardsTo(state.player.hand);
    const duplications = this.state.player.hand.cards.filter(card => this.state.player.hand.cards.some(anotherCard => anotherCard.n == card.n && card.id !== anotherCard.id));
    if(duplications.length === 0){
      console.warn("no duplications");
      return;
    }
    for(let card of duplications){
      this.state.discard.add(this.state.player.hand.pickByCardId(card.id));
    }
    for(let i = 0; i < duplications.length; i++){
      this.state.player.hand.add(state.deck.draw());
      this.state.player.hand.cards.forEach(card => card.reveal());
    }
    this.state.player.specialPoint -= 2;
  }

  unstage(cardId){
    const card = this.state.player.board.pickByCardId(cardId);
    if(card){
      this.state.player.hand.add(card);
    }
    else{
      console.warn("couldn't find card");
    }
  }

  toggleSkillSelectMode(){
    if(this.state.player.specialPoint < 2){
      console.warn("insufficient sp");
      this.state.uiState.selectSkillTarget = false;
      return;
    }
    this.state.uiState.selectSkillTarget = !this.state.uiState.selectSkillTarget;
  }
};
export default Controller;
