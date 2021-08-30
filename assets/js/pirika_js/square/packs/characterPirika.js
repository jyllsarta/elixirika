let Card = require("./card");

module.exports = class CharacterPirika {
  onGameStart(model){
    console.log("ピリカだよー");
    model.deck.field.addCard(new Card( 0, "X", "special"));
    model.deck.field.addCard(new Card( 0, "X", "special"));
    // デッキに混ぜ物をしたので再シャッフルが必須
    model.deck.shuffle(model.seed);
  }
};
