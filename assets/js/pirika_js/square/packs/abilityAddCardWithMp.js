module.exports = class AbilityAddCardWithMp {
  constructor(cards, cost){
    this.category = "addCardWithMp";
    this.cards = cards;
    this.cost = cost;
    this.isRemovedAfterIgnite = false;
  }

  stringExpression(){
    return `${this.cards.map(card=>card.stringExpression()).join()} / ${this.cost}`;
  }

  ignite(character, model){
    const callback = character.getCallback("isAbilityColded", model.chapter.index);
    if(callback && callback(character, model)){
      console.warn("cold now!");
      return;
    }
    if(character.uniqueParameters.mp < this.cost){
      console.warn("insufficient mp!");
      return;
    }
    character.uniqueParameters.mp -= this.cost;
    this.cards.map(card=>model.hand.field.addCard(card));
  }
};
