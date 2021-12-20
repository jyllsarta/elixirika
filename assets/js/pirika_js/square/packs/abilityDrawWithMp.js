const Constants = require("./constants");

module.exports = class AbilityDrawWithMp {
  constructor(drawCount, cost){
    this.category = "drawWithMp";
    this.drawCount = drawCount;
    this.cost = cost;
    this.isRemovedAfterIgnite = false;
  }

  stringExpression(){
    return `DRAW[${this.drawCount}] / ${this.cost}`;
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
    if(model.hand.field.cards.length >= Constants.maxHandCardNumber){
      console.warn("max hand cards!");
      model.messageManager.register("cannotIgniteAbilityCardPocketMaxCard");
      return;
    }
    const drawNum = Math.min(this.drawCount, model.deck.field.cards.length)
    character.uniqueParameters.mp -= this.cost;
    for(let i = 0; i < drawNum; ++i){
      model.hand.field.addCard(model.deck.field.draw());
    }
    model.messageManager.register("abilityMagic");
  }
};
