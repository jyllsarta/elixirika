let Card = require("../card");

module.exports = class Character1_3 {
  onGameStart(character, model){
    console.log("よわピリカです...");
    character.uniqueParameters = {
      // X X 11s 11h を追加する事ができる残り回数
      restAbilityCount: [1, 0, 1, 1]
    }
    model.deck.field.addCard(new Card(0, "X", "special"));
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
