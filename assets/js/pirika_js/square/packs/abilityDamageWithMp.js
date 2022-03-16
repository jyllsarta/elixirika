module.exports = class AbilityDamageWithMp {
  constructor(slot, damageValue, cost){
    this.slot = slot;
    this.category = "damageWithMp";
    this.damageValue = damageValue;
    this.cost = cost;
    this.isRemovedAfterIgnite = false;
  }

  stringExpression(){
    const kanjiExpression = "零一二三四五六七八九十"[this.damageValue];
    if(!kanjiExpression){
      console.warn(`damage ${this.damageValue} is not supported! set 0 to 10`)
    }
    return `${kanjiExpression}連即撃/${this.cost}`;
  }

  ignite(character, model){
    if(character.uniqueParameters.mp < this.cost){
      model.messageManager.register("cannotIgniteAbilityMagic");
      model.soundManager.register("miss");
      console.warn("insufficient mp!");
      return;
    }
    character.uniqueParameters.mp -= this.cost;
    character.damageToNextEnemy(this.damageValue, model, true);
    model.messageManager.register("abilityMagic");
    model.soundManager.register("special2");
  }
};
