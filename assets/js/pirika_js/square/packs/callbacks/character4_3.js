let AbilityAddCardWithMp = require("../abilityAddCardWithMp");
let AbilityDamageWithMp = require("../abilityDamageWithMp");
let AbilityDrawWithMp = require("../abilityDrawWithMp");
let Card = require("../card");
module.exports = class Character4_3 {
  onGameStart(character, model){
    character.uniqueParameters.abilities = [
      new AbilityAddCardWithMp(2, [new Card( 0, "x", "special"), new Card( 0, "x", "special")], 80),
      new AbilityDamageWithMp(1, 1, 15),
      new AbilityDrawWithMp(3, 2, 6),
    ]
    const { enemies } = character.getCallback("starPaletteParameter", model.chapter.index)();
    character.initializeEnemy(enemies);
  }
  starPaletteParameter(){
    return {
      enemies: [
        {id: 1, order: 1, hp: 10, image: "nya"},
        {id: 2, order: 2, hp: 6,  image: "ghost"},
        {id: 3, order: 3, hp: 10, image: "nya"},
        {id: 4, order: 4, hp: 6,  image: "ghost"},
        {id: 5, order: 5, hp: 15, image: "boss"},
      ]
    };
  }
};
