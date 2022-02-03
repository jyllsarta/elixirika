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
    const callback = character.getCallback("isAbilityColded", model.chapter.index);
    if(callback && callback(character, model)){
      console.warn("cold now!");
      return;
    }
    model.hand.field.addCard(this.card.createCopy());
    model.messageManager.register("abilityAddCard");
  }
};
