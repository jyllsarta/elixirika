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
    console.log(this.card)
    if(this.card){
      model.hand.field.addCard(this.card);
      this.card = null;
    }
  }
};
