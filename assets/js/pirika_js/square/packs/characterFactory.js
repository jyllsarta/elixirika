let Character1 = require("./character1");
let Character3 = require("./character3");

module.exports = class CharacterFactory {
  getCharacterById(characterId){
    const characterMaster = {
      1: Character1,
      3: Character3,
    }

    return new characterMaster[characterId];
  }
};
