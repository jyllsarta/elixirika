let Card = require("../card");
const Constants = require("../constants");

module.exports = class Character1_4 {
  onGameStart(character, model){
    for(let i = 1; i <= Constants.normalCardPerSuit; ++i){
      for(let suit of ["j", "j"]){
        model.deck.field.addCard(new Card(i, suit, "normal"));
      }
    }
    model.deck.shuffle(model.seededRandom);
  }
};
