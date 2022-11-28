let Character1 = require("./character1");
let Character2 = require("./character2");
let Character3 = require("./character3");
let Character4 = require("./character4");

module.exports = class CharacterFactory {
  getCharacterById(characterId) {
    const characterMaster = {
      1: Character1,
      2: Character2,
      3: Character3,
      4: Character4,
    };

    return new characterMaster[characterId]();
  }
};
