module.exports = class Character2_3 {
  starPaletteParameter(){
    return {
      consumptionPerCard: 5,
      maxEnergy: 100,
      scoreRanges: [
        {min: 40, max: 60, score: 5},
        {min: 20, max: 80, score: 3},
      ],
      sandStorm: false,
      staleMateByEnergy: true,
      coldAbility: true,
    };
  }
};
