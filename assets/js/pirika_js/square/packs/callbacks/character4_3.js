let AbilityAddCardWithMp = require("../abilityAddCardWithMp");
let AbilityDamageWithMp = require("../abilityDamageWithMp");
let AbilityDrawWithMp = require("../abilityDrawWithMp");
let Card = require("../card");
module.exports = class Character4_3 {
  onGameStart(character, model){
    character.uniqueParameters.abilities = [
      new AbilityDamageWithMp(1, 5),
      new AbilityAddCardWithMp([new Card( 0, "x", "special"), new Card( 0, "x", "special"), new Card( 0, "x", "special"), new Card( 0, "x", "special"), new Card( 0, "x", "special")], 50),
      new AbilityDrawWithMp(2, 3),
    ]
    const { enemies } = character.getCallback("starPaletteParameter", model.chapter.index)();
    character.initializeEnemy(enemies);
  }
  starPaletteParameter(){
    return {
      enemies: [
        {id: 1, hp: 8, image: "nya"},
        {id: 2, hp: 4, image: "ghost"},
        {id: 3, hp: 8, image: "nya"},
        {id: 4, hp: 4, image: "ghost"},
        {id: 5, hp: 15, image: "boss"},
      ]
    };
  }
};
