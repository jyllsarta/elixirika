import { PhaseStateMachine } from "./phase_state_machine";
import { SkillFacade } from "./skill_facade";
import { Break } from "./break";
import { Stack } from "./stack";

// TOOD: コントローラーを通った操作は将来的に履歴を残せるようにする
// TODO: isGameEndなら何もしないようにする
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
    if(this.state.uiState.selectSkillTarget && this.state.uiState.isFieldEffect){
      this.invokeFieldEffect(this.state.uiState.selectingSkillId, cardId);
      this.toggleSkillSelectMode(null, false);
    }
    else if(this.state.uiState.selectSkillTarget){
      this.invokeSkill(this.state.uiState.selectingSkillId, cardId);
      this.toggleSkillSelectMode(null, false);
    }
    else{
      this._sendToBoard(cardId);
    }
  }

  invokeSkill(skillId, maybeCardId){
    new SkillFacade().invoke(this.state, this.state.player, skillId, maybeCardId);
  }

  invokeFieldEffect(skillId, maybeCardId){
    new SkillFacade().invoke(this.state, this.state.player, skillId, maybeCardId);
    this.state.fieldEffectActivateCount += 1;
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

    this._doSendToBoard(card);

    // フィールドエフェクトのonSendCardを発火
    this.state.fieldEffect.asModule()?.onSendCard(this.state);

    // MPを1点付与
    this.state.player.addSpecialPoint(1);
  }

  _doSendToBoard(card){
    // pick して移動元フィールドから消す
    this.state.player.hand.pickByCardId(card.id);
    this._judgeAndBreak(this.state.player, this.state.enemy, card);
    this._judgeAndBreakHand(this.state.player, this.state.enemy, card);
    this.state.board.add(card);
  }

  toggleSkillSelectMode(skillId, isFieldEffect){
    this.state.uiState.selectingSkillId = skillId;
    this.state.uiState.selectSkillTarget = !this.state.uiState.selectSkillTarget;
    this.state.uiState.isFieldEffect = isFieldEffect;
  }

  processEnemySelectPhase(){
    if(this.state.enemy.hand.cards.length === 0){
      return;
    }
    const card = this.state.enemy.hand.cards.pop();
    this._judgeAndBreak(this.state.enemy, this.state.player, card);
    this.state.board.add(card);
  }

  _judgeAndBreak(actor, target, card){
    if(target.breakConditions.length === 0){
      console.warn("breakConditions is empty");
      return;
    }

    const nextCondition = target.breakConditions[0];
    const breakResult = new Break().execute(this.state, this.state.board, actor, target, nextCondition, card);
    if(breakResult){
      if(nextCondition.card){
        this.state.discard.add(nextCondition.card);
      }
      target.breakConditions.shift(0);
    }
  }

  _judgeAndBreakHand(actor, target, card){
    if(target.hand.cards.length === 0){
      console.warn("hand is empty");
      return;
    }

    const conditions = target.hand.asBreakConditions();
    const nextCondition = conditions.slice(-1)[0];
    const breakResult = new Break().execute(this.state, this.state.board, actor, target, nextCondition, card);

    if(breakResult){
      const card = target.hand.cards.pop();
      this.state.discard.add(card);
      target.hand.cards.slice(-1)[0]?.reveal();
    }
  }
};
export default Controller;
