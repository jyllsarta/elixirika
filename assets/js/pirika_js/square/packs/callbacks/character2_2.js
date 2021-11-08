module.exports = class Character2_2 {
  starPaletteParameter(){
    return {
      consumptionPerCard: 3,
      maxEnergy: 100,
      scoreRanges: [
        {min: 40, max: 60, score: 5},
        {min: 20, max: 80, score: 3},
      ],
      sandStorm: true,
      staleMateByEnergy: false,
      coldAbility: false,
    };
  }
};
