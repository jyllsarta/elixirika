const Constants = require("../constants");
module.exports = class Character2_1 {
  starPaletteParameter(){
    return {
      consumptionPerCard: 3,
      consumptionPerDraw: 3,
      maxEnergy: 100,
      scoreRanges: [
        {min: Constants.bestEnergyLowLimit, max: Constants.bestEnergyHighLimit, score: 5},
        {min: 0, max: 100, score: 1},
      ],
      sandStorm: false,
      staleMateByEnergy: false,
      coldAbility: false,
    };
  }
};
