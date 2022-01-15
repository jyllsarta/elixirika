module.exports = class AbilityDamageWithMp {
  constructor(damageValue, cost){
    this.category = "damageWithMp";
    this.damageValue = damageValue;
    this.cost = cost;
    this.isRemovedAfterIgnite = false;
  }

  stringExpression(){
    return `DMG[${this.damageValue}] / ${this.cost}`;
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
