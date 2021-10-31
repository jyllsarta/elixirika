module.exports = class AbilityAddCard {
  constructor(card){
    this.card = card;
  }

  stringExpression(){
    return this.card.stringExpression();
  }

  ignite(character, model){
    model.hand.field.addCard(this.card);
  }
};
