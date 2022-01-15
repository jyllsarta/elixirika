const Constants = require("./constants");

module.exports = class AbilityCardPocket {
  constructor(card){
    this.category = "cardPocket";
    this.card = null;
    this.isRemovedAfterIgnite = false;
  }

  stringExpression(){
    return this.card?.stringExpression() || "o";
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
