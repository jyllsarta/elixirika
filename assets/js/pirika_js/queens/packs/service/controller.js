import { PhaseStateMachine } from "./phase_state_machine";
import { SkillFacade } from "./skill_facade";

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

  invokeSkill(skillId, maybeCardId){
    new SkillFacade().invoke(this.state, this.state.player, skillId, maybeCardId);
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
