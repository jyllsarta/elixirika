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
    const callback = character.getCallback("isAbilityColded", model.chapter.index);
    if(callback && callback(character, model)){
      console.log("cold now!");
      return;
    }
    model.hand.field.addCard(this.card);
  }
};
