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
      console.log("cold now!");
      return;
    }
    if(character.uniqueParameters.mp < this.cost){
      console.warn("insufficient mp!");
      return;
    }
    character.uniqueParameters.mp -= this.cost;
    character.damageToNextEnemy(this.damageValue);
  }
};