import Masterdata from '../masterdata.js';

export class SkillFacade {
  invoke(state, member, skillId, maybeCardId){
    if(!this.canInvoke(state, member, skillId, maybeCardId)){
      console.warn("couldn't invoke skill");
      return;
    }
    const skill = Masterdata.get("skills", skillId);
    this.resolveSkillEffect(state, member, skill, maybeCardId, skill.effect_key1, skill.effect_value1);
    this.resolveSkillEffect(state, member, skill, maybeCardId, skill.effect_key2, skill.effect_value2);
    member.specialPoint -= skill.cost;
  }

  canInvoke(state, member, skillId, maybeCardId){
    const skill = Masterdata.get("skills", skillId);
    if(!this.validatePhase(state)){
      return false;
    }
    if(!this.validateSp(member, skill)){
      return false;
    }
    const result1 = this.validateSkillEffect(state, member, skill, maybeCardId, skill.effect_key1, skill.effect_value1);
    const result2 = this.validateSkillEffect(state, member, skill, maybeCardId, skill.effect_key2, skill.effect_value2);
    // 効果が全部発動しない場合のみ失敗
    if(!result1 && !result2){
      return false;
    }
    return true;
  }

  validatePhase(state){
    return state.phase === "player_select";
  }

  validateSp(member, skill){
    return member.specialPoint >= skill.cost;
  }

  validateSkillEffect(state, member, skill, maybeCardId, effectKey, effectValue){
    if(!effectKey){
      return false;
    }
    // バリデーションがないならOK
    if(!this["validate_" + effectKey]){
      return true;
    }
    // バリデーションがあるならその結果次第
    return this["validate_" + effectKey](state, member, skill, maybeCardId, effectValue)
  }

  resolveSkillEffect(state, member, skill, maybeCardId, effectKey, effectValue){
    if(!effectKey){
      return false;
    }
    this[effectKey](state, member, skill, maybeCardId, effectValue);
    return true;
  }

  // 以下 skill effect

  draw(state, member, skill, maybeCardId, effectValue){
    for(let i = 0; i < effectValue; i++){
      const card = state.deck.draw();
      card.reveal();
      if(card){
        member.hand.add(card);
      }
    }
  }

  discardTarget(state, member, skill, maybeCardId, effectValue){
    const card = member.hand.pickByCardId(maybeCardId);
    if(card){
      state.discard.add(card);
    }
  }

  validate_sweep(state, member, skill, maybeCardId, effectValue){
    state.player.board.sendAllCardsTo(state.player.hand);
    const duplications = state.player.hand.cards.filter(card => state.player.hand.cards.some(anotherCard => anotherCard.n == card.n && card.id !== anotherCard.id));
    if(duplications.length === 0){
      console.warn("no duplications");
      return false;
    }
    return true;
  }

  sweep(state, member, skill, maybeCardId, effectValue){
    const duplications = state.player.hand.cards.filter(card => state.player.hand.cards.some(anotherCard => anotherCard.n == card.n && card.id !== anotherCard.id));
    for(let card of duplications){
      state.discard.add(state.player.hand.pickByCardId(card.id));
    }
    for(let i = 0; i < duplications.length; i++){
      state.player.hand.add(state.deck.draw());
      state.player.hand.cards.forEach(card => card.reveal());
    }
  }
};
export default SkillFacade;
