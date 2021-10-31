module.exports = class AbilityCardPocket {
  constructor(card){
    this.card = null;
    this.isRemovedAfterIgnite = false;
  }

  stringExpression(){
    return this.card?.stringExpression() || "○";
  }

  ignite(character, model){
    if(this.card){
      model.hand.field.addCard(this.card);
      this.card = null;
    }
  }
};
