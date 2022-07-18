const Constants = require("./constants");
module.exports = class AbilityAddCardWithMp {
  constructor(slot, cards, cost){
    this.slot = slot;
    this.category = "addCardWithMp";
    this.cards = cards;
    this.cost = cost;
    this.isRemovedAfterIgnite = false;
  }

  stringExpression(){
    return `隠し切札/${this.cost}`;
  }

  ignite(character, model){
    if(character.uniqueParameters.mp < this.cost){
      model.messageManager.register("cannotIgniteAbilityMagic");
      model.soundManager.register("miss");
      console.warn("insufficient mp!");
      return;
    }
    if(model.hand.field.cards.length + this.cards.length > Constants.maxHandCardNumber){
      model.messageManager.register("cannotIgniteAbilityMagicByCardOver");
      model.soundManager.register("miss");
      return;
    }
    character.uniqueParameters.mp -= this.cost;
    this.cards.map(card=>{
      if(model.hand.field.cards.length < Constants.maxHandCardNumber){
        model.hand.field.addCard(card.createCopy())
      }
    });
    model.messageManager.register("abilityMagic");
    model.soundManager.register("special2");
  }
};
