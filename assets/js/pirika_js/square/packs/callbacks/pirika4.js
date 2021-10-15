let Card = require("../card");

module.exports = class Pirika4 {
  // character, model の状況では、field の末尾に cardを積むことができる？
  cardStackRule(character, model, card, field){
    return true;
  }
};
