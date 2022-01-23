const Constants = require("../constants");
module.exports = class Character2_4 {
  starPaletteParameter(){
    return {
      consumptionPerCard: 3,
      consumptionPerDraw: 3,
      maxEnergy: 100,
      scoreRanges: [
        {min: Constants.bestEnergyLowLimit, max: Constants.bestEnergyHighLimit, score: 5},
        {min: 0, max: 100, score: 1},
      ],
      sandStorm: true,
      staleMateByEnergy: true,
      coldAbility: true,
    };
  }

};
