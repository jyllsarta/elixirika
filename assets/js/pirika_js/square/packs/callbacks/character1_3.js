let Card = require("../card");
let AbilityAddCard = require("../abilityAddCard");

module.exports = class Character1_3 {
  onGameStart(character, model){
    console.log("よわピリカです...");

    character.uniqueParameters.abilities = [
      new AbilityAddCard(new Card( 0, "x", "special")),
      new AbilityAddCard(new Card( 11, "s", "sender")),
      new AbilityAddCard(new Card( 11, "h", "sender")),
    ]
    model.deck.field.addCard(new Card(0, "x", "special"));
    model.deck.shuffle(model.seededRandom);
  }
  starPaletteParameter(){
    return {
      kinds: [
        {value: 2, order: 1},
        {value: 3, order: 1},
        {value: 4, order: 1},
        {value: 5, order: 1},
        {value: 6, order: 1},
        {value: 7, order: 1},
        {value: 8, order: 1},
        {value: 9, order: 1, upper: true},
      ]
    };
  }
};
