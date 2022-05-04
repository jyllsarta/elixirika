let Card = require("../card");
const Constants = require("../constants");

module.exports = class Character1_3 {
  onGameStart(character, model){
    for(let i = 1; i <= Constants.normalCardPerSuit; ++i){
      for(let suit of ["j", "j"]){
        model.deck.field.addCard(new Card(i, suit, "normal"));
      }
    }
    model.deck.field.cards = model.deck.field.cards.filter(card=>(card.number <= 7 || card.category != "normal"));
    model.deck.shuffle(model.seededRandom);
  }

  // お宝回収はアーリーグレイスの対象外
  isClearedMainTarget(character, model){
    return false;
  }
};


