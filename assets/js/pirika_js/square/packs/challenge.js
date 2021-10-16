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
    return challenges.filter(challenge=>this.isCleared(challenge, model)).map(challenge=>challenge.id)    
  }

  isCleared(challenge, model){
    switch(challenge.type){
      case "point":
        return this.isClearedPoint(challenge, model);
        break;
      case "starPaletteKind":
        return this.isClearedStarPaletteKind(challenge, model);
        break;
      default:
        console.warn(`unknown challenge type: ${challenge.type}`)
        return false;
        break;
    }
  }

  isClearedPoint(challenge, model){
    const score = model.starPalette.score();
    return challenge.value1 <= score
  }

  isClearedStarPaletteKind(challenge, model){
    // TODO: starPaletteParameter を参照してキャラごとに別々のパレット状況を参照する
    const kindCount = model.starPalette.status().filter(status=>status).length;
    return challenge.value1 <= kindCount
  }
};
