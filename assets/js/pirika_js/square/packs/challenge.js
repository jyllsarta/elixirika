let challengeMaster = require("../masterdata/challenges.js")

module.exports = class Challenge {
  constructor(){
    this.idTable = this.getAll().reduce((iter, x)=>{iter[x.id]=x; return iter}, {});
  }

  getAll(){
    return challengeMaster;
  }

  getByChallengeIds(challengeIds){
    return this.getAll().filter(x=>challengeIds.some(challengeId=>challengeId===x.id))
  }

  // model の状態を解析してクリアした実積のIDのリストを返す
  clearedChallengeIds(model, targetChallengeIds){
    const challenges = this.getByChallengeIds(targetChallengeIds);
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
