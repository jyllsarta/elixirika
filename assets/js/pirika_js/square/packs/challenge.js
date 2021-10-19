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
      case "discardCount":
        return this.isClearedDiscardCount(challenge, model);
        break;
      case "minusTrickCount":
        return this.isClearedMinusTrickCount(challenge, model);
        break;
      case "biggestStack":
        return this.isClearedBiggestStack(challenge, model);
        break;
      case "getAllTreasure":
        return this.isClearedGetAllTreasure(challenge, model);
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
    const neededKinds = model.character.getCallback("starPaletteParameter", model.chapter.index)()?.kinds;
    if(!neededKinds){
      console.warn("neededKinds was not found");
      return;
    }
    const kindCount = neededKinds.filter(kind=>model.starPalette.statusAt(kind)).length;
    return challenge.value1 <= kindCount
  }

  isClearedDiscardCount(challenge, model){
    return model.isStaleMate() && model.graveyard.field.cards.length <= challenge.value1;
  }

  isClearedMinusTrickCount(challenge, model){
    const tricks = model.board.fields.reduce((sum, field)=>sum+field.minusTrickCount(), 0) + model.starPalette.fields.reduce((sum, field)=>sum+field.minusTrickCount(), 0);
    return challenge.value1 <= tricks;
  }

  isClearedBiggestStack(challenge, model){
    const maxStackSize = Math.max(...(model.starPalette.fields.map(field=>field.cards.length)));
    return challenge.value1 <= maxStackSize;
  }

  // 「すべての j を回収している」とは「ゲーム終了時、手札にも捨札にもボードにも j がない状態」である
  isClearedGetAllTreasure(challenge, model){
    return model.isStaleMate() && 
      this.hasNoJewelCard(model.graveyard.field) && 
      this.hasNoJewelCard(model.hand.field) && 
      model.board.fields.every(field => this.hasNoJewelCard(field));
  }

  // private

  hasNoJewelCard(field){
    return field.cards.every(card => card.suit !== "j")
  }
};
