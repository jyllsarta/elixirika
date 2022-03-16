module.exports = class AbilityAddCard {
  constructor(slot, card){
    this.slot = slot;
    this.category = "addCard";
    this.card = card;
    this.isRemovedAfterIgnite = true;
  }

  stringExpression(){
    return this.card.stringExpression();
  }

  ignite(character, model){
    model.hand.field.addCard(this.card.createCopy());
    model.messageManager.register("abilityAddCard");
    model.soundManager.register("special2");
  }
};
