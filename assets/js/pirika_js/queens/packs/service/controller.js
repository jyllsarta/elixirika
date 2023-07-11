import { PhaseStateMachine } from "./phase_state_machine";
import { SkillFacade } from "./skill_facade";
import { Break } from "./break";

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

  selectCardByCardId(cardId){
    if(this.state.uiState.selectSkillTarget){
      this.invokeSkill(this.state.uiState.selectingSkillId, cardId);
      this.toggleSkillSelectMode(null);
    }
    else{
      this.doSendToBoard(cardId);
    }
  }

  invokeSkill(skillId, maybeCardId){
    new SkillFacade().invoke(this.state, this.state.player, skillId, maybeCardId);
  }

  doSendToBoard(cardId){
    const card = this.state.player.hand.pickByCardId(cardId);
    if(!card){
      console.warn("couldn't find card");
      return;
    }
    this.state.board.add(card);

    const nextCondition = this.state.enemy.breakConditions[0];
    if(nextCondition && new Break().isValid(this.state, this.state.board, nextCondition)){
      if(nextCondition.card){
        this.state.discard.add(nextCondition.card);
      }
      this.state.enemy.breakConditions.shift(0);
    }
  }

  toggleSkillSelectMode(skillId){
    this.state.uiState.selectingSkillId = skillId;
    this.state.uiState.selectSkillTarget = !this.state.uiState.selectSkillTarget;
  }

  processEnemySelectPhase(){
    if(this.state.enemy.hand.cards.length === 0){
      return;
    }
    // TODO: コード重複の解消
    const card = this.state.enemy.hand.cards.pop();
    const nextCondition = this.state.player.breakConditions[0];
    this.state.board.add(card);
    if(nextCondition && new Break().isValid(this.state, this.state.board, nextCondition)){
      if(nextCondition.card){
        this.state.discard.add(nextCondition.card);
      }
      this.state.player.breakConditions.shift(0);
    }
  }
};
export default Controller;
