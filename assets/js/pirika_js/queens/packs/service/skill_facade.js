import Masterdata from '../masterdata.js';

export class SkillFacade {
  invoke(state, member, skillId, maybeCardId){
    const skill = Masterdata.get("skills", skillId);
    console.log(skill);
    if(state.phase !== "player_select"){
      console.warn("invalid phase");
      return;
    }
    if(member.specialPoint < skill.cost){
      console.warn("insufficient sp");
      return;
    }
    const result1 = this.resolveSkillEffect(state, member, skill, maybeCardId, skill.effect_key1, skill.effect_value1);
    const result2 = this.resolveSkillEffect(state, member, skill, maybeCardId, skill.effect_key2, skill.effect_value2);
    if(result1 || result2){
      member.specialPoint -= skill.cost;
    }
  }

  resolveSkillEffect(state, member, skill, maybeCardId, effectKey, effectValue){
    if(!effectKey){
      return false;
    }
    if(this["validate_" + effectKey] && !this["validate_" + effectKey](state, member, skill, maybeCardId, effectValue)){
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
