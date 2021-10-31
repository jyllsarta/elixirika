module.exports = class AbilityAddCard {
  constructor(card){
    this.category = "addCard";
    this.card = card;
    this.isRemovedAfterIgnite = true;
    console.log(this.isRemovedAfterIgnite);
  }

  stringExpression(){
    return this.card.stringExpression();
  }

  ignite(character, model){
    model.hand.field.addCard(this.card);
  }
};
