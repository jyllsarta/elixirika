import { PhaseStateMachine } from "./phase_state_machine";
import { SkillFacade } from "./skill_facade";
import { Break } from "./break";
import { Stack } from "./stack";
import { AdditionalCard } from "./additional_card";

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
      this._sendToBoard(cardId);
    }
  }

  invokeSkill(skillId, maybeCardId){
    new SkillFacade().invoke(this.state, this.state.player, skillId, maybeCardId);
  }

  _sendToBoard(cardId){
    const card = this.state.player.hand.findByCardId(cardId);
    if(!card){
      console.warn("couldn't find card");
      return;
    }

    //stack条件を満たさない場合は何もしない
    if(!new Stack().isValid(this.state, this.state.board, card)){
      console.warn("stack condition is not satisfied");
      return;
    }

    const amount = new AdditionalCard().amount(this.state, this.state.board, card);

    this._doSendToBoard(card);

    // 追加カードを引く
    const cards = this.state.deck.drawMany(amount);
    cards.map(card=>card.reveal());
    if(cards){
      this.state.player.hand.addMany(cards);
    }
  }

  _doSendToBoard(card){
    // pick して移動元フィールドから消す
    this.state.player.hand.pickByCardId(card.id);
    this.state.board.add(card);
    this._judgeAndBreak(this.state.enemy);
    this._judgeAndBreakHand(this.state.enemy);
  }

  toggleSkillSelectMode(skillId){
    this.state.uiState.selectingSkillId = skillId;
    this.state.uiState.selectSkillTarget = !this.state.uiState.selectSkillTarget;
  }

  processEnemySelectPhase(){
    if(this.state.enemy.hand.cards.length === 0){
      return;
    }
    const card = this.state.enemy.hand.cards.pop();
    this.state.board.add(card);
    this._judgeAndBreak(this.state.player);
  }

  _judgeAndBreak(member){
    if(member.breakConditions.length === 0){
      console.warn("breakConditions is empty");
      return;
    }

    const nextCondition = member.breakConditions[0];

    if(new Break().isValid(this.state, this.state.board, nextCondition)){
      if(nextCondition.card){
        this.state.discard.add(nextCondition.card);
      }
      member.breakConditions.shift(0);
    }
  }

  _judgeAndBreakHand(member){
    if(member.hand.cards.length === 0){
      console.warn("hand is empty");
      return;
    }

    const conditions = member.hand.asBreakConditions();
    const nextCondition = conditions.slice(-1)[0];

    if(new Break().isValid(this.state, this.state.board, nextCondition)){
      const card = member.hand.cards.pop();
      this.state.discard.add(card);
      member.hand.cards.slice(-1)[0]?.reveal();
    }
  }
};
export default Controller;
