const Constants = require("./constants");

module.exports = class AbilityShuffle {
  constructor(slot, count = 3){
    this.slot = slot;
    this.category = "shuffle";
    this.isRemovedAfterIgnite = false;
    this.count = count;
  }

  stringExpression(){
    return `引き直し/残${this.count}`;
  }

  ignite(character, model){
    if(this.count <= 0){
      model.messageManager.register("cannotIgniteAbilityMagic");
      model.soundManager.register("miss");
      return;
    }
    model.hand.field.sendAllCardTo(model.deck.field);
    model.deck.shuffle(model.seededRandom);
    const maxCount = Math.min(model.deck.field.cards.length, Constants.handCardNumber);
    for(let i = 0; i < maxCount; ++i){
      model.hand.field.addCard(model.deck.field.draw());
    }
    this.count--;
    model.messageManager.register("abilitySuffle");
    model.soundManager.register("special2");
  }
};
