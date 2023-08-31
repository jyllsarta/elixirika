import { PhaseStateMachine } from "./phase_state_machine";
import { SkillFacade } from "./skill_facade";
import { Break } from "./break";
import { Stack } from "./stack";
import Member from "../model/member";

export class Controller {
  constructor(state){
    this.state = state;
  }

  operate(method, ...args){
    if(this.state.isGameEnd()){
      return;
    }
    this.state.actionCount += 1;
    this[method](...args);
  }

  // public

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
    this.state.updateScript("skill");
  }

  invokeFieldEffect(skillId, maybeCardId){
    new SkillFacade().invoke(this.state, this.state.player, skillId, maybeCardId);
    this.state.fieldEffectActivateCount += 1;
    this.state.updateScript("fieldEffect");
  }

  clickCharacter(){
    this.state.uiState.clickCount = Math.min(this.state.uiState.clickCount + 1, 3);
    this.state.updateScript("click", this.state.uiState.clickCount);
  }

  //private

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

    this.state.updateScript("combo", Math.min(this.state.board.cards.length, 9));
  }

  _doSendToBoard(card){
    // pick して移動元フィールドから消す
    this.state.player.hand.pickByCardId(card.id);
    this._judgeAndBreak(this.state.player, this.state.enemy, card);
    const enemyHandBreakCount = this._judgeAndBreakHand(this.state.player, this.state.enemy, card);
    if(enemyHandBreakCount > 0){
      this.state.enemy.addSpecialPoint(enemyHandBreakCount * 2);
    }
    this.state.board.add(card);
  }

  toggleSkillSelectMode(skillId, isFieldEffect){
    this.state.uiState.selectingSkillId = skillId;
    this.state.uiState.selectSkillTarget = !this.state.uiState.selectSkillTarget;
    this.state.uiState.isFieldEffect = isFieldEffect;
  }

  processEnemySelectPhase(){
    const card = this.state.enemy.hand.cards.pop();
    this._judgeAndBreak(this.state.enemy, this.state.player, card);
    this.state.board.add(card);
    this.state.enemy.addSpecialPoint(1);
    this.state.uiState.enemyComboCount += 1;
    this.state.updateScript("enemyCombo", this.state.uiState.enemyComboCount);
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

      if(actor.isPlayer){
        this.state.updateScript("break");
      }

      this.state.checkGameEndScript();
    }
    return breakResult;
  }

  _judgeAndBreakHand(actor, target, card){
    if(target.hand.cards.length === 0){
      console.warn("hand is empty");
      return;
    }

    const conditions = target.hand.asBreakConditions();

    const brokenCardIds = conditions
    .filter(condition => condition.card.revealed)
    .filter(condition => new Break().execute(this.state, this.state.board, actor, target, condition, card))
    .map(condition => condition.card.id);
    
    if(brokenCardIds.length > 0){
      const removedCards = target.hand.cards.filter(card => brokenCardIds.includes(card.id));
      target.hand.cards = target.hand.cards.filter(card => !brokenCardIds.includes(card.id));
      this.state.discard.addMany(removedCards);
      this.state.enemy.revealHandMustShow();

      if(actor.isPlayer){
        this.state.updateScript("breakHand");
      }
    }
    return brokenCardIds.length;
  }

};
export default Controller;
