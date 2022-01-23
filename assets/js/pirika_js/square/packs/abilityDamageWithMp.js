module.exports = class AbilityDamageWithMp {
  constructor(damageValue, cost){
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
    return `${kanjiExpression}連火球/${this.cost}`;
  }

  ignite(character, model){
    const callback = character.getCallback("isAbilityColded", model.chapter.index);
    if(callback && callback(character, model)){
      console.warn("cold now!");
      return;
    }
    if(character.uniqueParameters.mp < this.cost){
      model.messageManager.register("cannotIgniteAbilityMagic");
      console.warn("insufficient mp!");
      return;
    }
    character.uniqueParameters.mp -= this.cost;
    character.damageToNextEnemy(this.damageValue, model, true);
    model.messageManager.register("abilityMagic");
  }
};
