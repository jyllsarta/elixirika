const Constants = require("./constants");

module.exports = class AbilityCardPocket {
  constructor(count = 5){
    this.category = "cardPocket";
    this.card = null;
    this.isRemovedAfterIgnite = false;
    this.count = count;
  }

  stringExpression(){
    return this.card?.stringExpression() ? `[ ${this.card?.stringExpression()} ]/残${this.count}` : `からっぽ/残${this.count}`;
  }

  ignite(character, model){
    const callback = character.getCallback("isAbilityColded", model.chapter.index);
    if(callback && callback(character, model)){
      console.warn("cold now!");
      return;
    }
    if(!this.card){
      model.messageManager.register("cannotIgniteAbilityCardPocketNoCard");
      return;
    }
    if(model.hand.field.cards.length >= Constants.maxHandCardNumber){
      console.warn("max hand cards!");
      model.messageManager.register("cannotIgniteAbilityCardPocketMaxCard");
      return;
    }
    model.hand.field.addCard(this.card);
    this.card = null;
    model.messageManager.register("abilityCardPocketWithdraw");
  }
};
