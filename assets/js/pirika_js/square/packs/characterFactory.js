let CharacterPirika = require("./characterPirika");
let CharacterMizuha = require("./characterMizuha");

module.exports = class CharacterFactory {
  getCharacterById(characterId){
    const characterMaster = {
      1: CharacterPirika,
      2: CharacterMizuha,
    }

    return new characterMaster[characterId];
  }
};
