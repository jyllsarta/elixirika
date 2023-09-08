import Masterdata from '../masterdata.js';
import Card from '../model/card.js';

export class SkillFacade {
  invoke(state, member, skillId, maybeCardId, validatesPhase = true){
    if(!this.canInvoke(state, member, skillId, maybeCardId, validatesPhase)){
      console.warn("couldn't invoke skill");
      return;
    }
    const skill = Masterdata.get("skills", skillId);

    const target1 = this._target(state, member, skill.effect_to_self1);
    this.resolveSkillEffect(state, target1, skill, maybeCardId, skill.effect_key1, skill.effect_value1);

    const target2 = this._target(state, member, skill.effect_to_self2);
    this.resolveSkillEffect(state, target2, skill, maybeCardId, skill.effect_key2, skill.effect_value2);

    member.specialPoint -= skill.cost;
    member.usedSkillCountMap[skillId] = (member.usedSkillCountMap[skillId] || 0) + 1;
  }

  canInvoke(state, member, skillId, maybeCardId, validatesPhase = true){
    const skill = Masterdata.get("skills", skillId);
    if(validatesPhase && !this.validatePhase(state)){
      return false;
    }
    if(!this.validateSp(member, skill)){
      return false;
    }
    if(!skill.is_field_effect && member.usedSkillCountMap[skillId] >= 1){
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
    // phase が player_select, setup, enemy_skillのいずれでもない場合は失敗
    const allowedPhases = ["player_select", "setup", "enemy_skill"];
    if(!allowedPhases.includes(state.phase)){
      return false;
    }
    return true;
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
      return;
    }
    if(!this[effectKey]){
      console.warn(`couldn't find effectKey: ${effectKey}`);
      return;
    }
    this[effectKey](state, member, skill, maybeCardId, effectValue);
  }

  _target(state, member, toSelf){
    if(toSelf){
      return member;
    }
    else{
      return this._opponent(state, member);
    }
  }

  _opponent(state, member){
    if(member === state.player){
      return state.enemy;
    }
    else{
      return state.player;
    }
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
    const cards = member.hand.cards;
    const duplications = cards.filter(card => cards.some(anotherCard => anotherCard.n == card.n && card.id !== anotherCard.id));
    if(duplications.length === 0){
      return false;
    }
    return true;
  }

  sweep(state, member, skill, maybeCardId, effectValue){
    const duplications = member.hand.cards.filter(card => member.hand.cards.some(anotherCard => anotherCard.n == card.n && card.id !== anotherCard.id));
    for(let card of duplications){
      state.discard.add(member.hand.pickByCardId(card.id));
    }
    for(let i = 0; i < duplications.length; i++){
      member.hand.add(state.deck.draw());
      member.hand.cards.forEach(card => card.reveal());
    }
  }

  validate_flush(state, member, skill, maybeCardId, effectValue){
    return this._validateAtLeastOneHand(member);
  }

  flush(state, member, skill, maybeCardId, effectValue){
    //memberの手札をすべて捨て、山札から同じ枚数だけ引く
    const cardCount = member.hand.cards.length;
    member.hand.sendAllCardsTo(state.discard);
    const drawnCards = state.deck.drawMany(cardCount);
    member.hand.addMany(drawnCards);
    member.hand.cards.forEach(card => card.reveal());
  }

  addMp(state, member, skill, maybeCardId, effectValue){
    member.specialPoint += effectValue;
  }

  validate_split(state, member, skill, maybeCardId, effectValue){
    return this._validateAtLeastOneHand(member);
  }

  split(state, member, skill, maybeCardId, effectValue){
    const card = member.hand.pickByCardId(maybeCardId);
    // card.n が 1 なら, 1を2枚生成して手札に加える
    if(card.n === 1){
      const cards = [new Card(1, card.suits), new Card(1, card.suits)];
      cards.map(card=>card.reveal());
      member.hand.addMany(cards);
    }
    // card.n が 2 以上なら, ランダムにxを選び, xと(card.n - x)を生成して手札に加える
    else{
      const x = Math.floor(Math.random() * (card.n - 1)) + 1;
      const cards = [new Card(x, card.suits), new Card(card.n - x, card.suits)];
      cards.map(card=>card.reveal());
      member.hand.addMany(cards);
    }
  }

  validate_multiple(state, member, skill, maybeCardId, effectValue){
    return this._validateAtLeastOneHand(member);
  }

  // maybeCardIdで指定されたカードの数値を2倍にし、手札に戻す。10を超えた場合は、超えた差分のカードを新たに生成して手札に加える
  multiple(state, member, skill, maybeCardId, effectValue){
    const card = member.hand.pickByCardId(maybeCardId);
    const newN = card.n * 2;
    const newCard = new Card(Math.min(newN, 10), card.suits);
    newCard.reveal();
    member.hand.add(newCard);
    if(newN > 10){
      const card = new Card(newN - 10, newCard.suits);
      card.reveal();
      member.hand.add(card);
    }
  }

  validate_monotone(state, member, skill, maybeCardId, effectValue){
    return this._validateAtLeastOneHand(member);
  }

  // 手札をすべてmaybeCardIdで指定されたカードのスートにする
  monotone(state, member, skill, maybeCardId, effectValue){
    const card = member.hand.findByCardId(maybeCardId);
    member.hand.cards.forEach(c => c.suits = card.suits);
  }

  buff(state, member, skill, maybeCardId, effectValue){
    member.buffState.addBuff(effectValue);
  }

  // member のbreakConditionsをeffectValue個削除する
  forceBreak(state, member, skill, maybeCardId, effectValue){
    const brokenConditions = member.breakConditions.splice(0, effectValue);
    // conditionsの中にcardがあればdiscardに送る
    brokenConditions.forEach(condition => {
      if(condition.card){
        state.discard.add(condition.card);
      }
    });
    //applyBreakをeffectValue回呼び出す
    for(let i = 0; i < effectValue; i++){
      const stunned = member.applyBreak();
      if(stunned){
        state.updateScript("stun");
      }
    }
    state.checkGameEndScript();
  }

  _validateAtLeastOneHand(member){
    if(member.hand.cards.length === 0){
      return false;
    }
    return true;
  }
};
export default SkillFacade;
