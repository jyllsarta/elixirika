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
    if(this.card){
      model.hand.field.addCard(this.card);
      this.card = null;
    }
  }
};
