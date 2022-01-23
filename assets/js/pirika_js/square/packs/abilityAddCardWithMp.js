const Constants = require("./constants");
module.exports = class AbilityAddCardWithMp {
  constructor(cards, cost){
    this.category = "addCardWithMp";
    this.cards = cards;
    this.cost = cost;
    this.isRemovedAfterIgnite = false;
  }

  stringExpression(){
    return `隠し切札/${this.cost}`;
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
    this.cards.map(card=>{
      if(model.hand.field.cards.length < Constants.maxHandCardNumber){
        model.hand.field.addCard(card.createCopy())
      }
    });
    model.messageManager.register("abilityMagic");
  }
};
