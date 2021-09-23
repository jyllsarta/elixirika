let challengeMaster = require("../masterdata/challenge.js")

module.exports = class Challenge {
  // マスタの仕組みができるまでベタ打ち
  getAll(){
    return challengeMaster;
  }

  // model の状態を解析してクリアした実積のIDのリストを返す
  clearedChallengeIds(model){
    const challenges = this.getAll();
    const pointChallenges = this.clearedPointChallengeIds(model, challenges.filter(challenge=>challenge.type=="point"));
    const starPaletteKindChallenges = this.clearedstarPaletteKindChallengeIds(model, challenges.filter(challenge=>challenge.type=="starPaletteKind"));
    return pointChallenges.concat(starPaletteKindChallenges);
  }

  clearedPointChallengeIds(model, challenges){
    const score = model.starPalette.score();
    return challenges
      .filter(challenge=>challenge.value1<=score)
      .map(challenge=>challenge.id)
  }

  clearedstarPaletteKindChallengeIds(model, challenges){
    const kindCount = model.starPalette.status().filter(status=>status).length;
    return challenges
      .filter(challenge=>challenge.value1<=kindCount)
      .map(challenge=>challenge.id)
  }
};
