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
      case "arityStyleScore":
        return this.isClearedArityStyleScore(challenge, model);
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
      case "completeRun":
        return this.isClearedCompleteRun(challenge, model);
        break;
      case "sandStormCount":
        return this.isClearedSandStormCount(challenge, model);
        break;
      case "sustainEnergyRange":
        return this.isClearedSustainEnergyRange(challenge, model);
        break;
      case "beEnergyRange":
        return this.isClearedBeEnergyRange(challenge, model);
        break;
      case "defeatEnemy":
        return this.isClearedDefeatEnemy(challenge, model);
        break;  
      case "defeatEnemyCount":
        return this.isClearedDefeatEnemyCount(challenge, model);
        break;  
      default:
        console.warn(`unknown challenge type: ${challenge.type}`)
        return false;
        break;
    }
  }

  isClearedPoint(challenge, model){
    const score = model.starPalette.score();
    return challenge.value1 <= score;
  }

  isClearedArityStyleScore(challenge, model){
    const score = model.starPalette.arityStyleScore();
    return challenge.value1 <= score;
  }

  isClearedStarPaletteKind(challenge, model){
    const kinds = model.character.getCallback("starPaletteParameter", model.chapter.index)()?.kinds;
    if(!kinds){
      console.warn("starPaletteParameter.kinds was not found");
      return;
    }
    const kindCount = kinds.filter(kind=>model.starPalette.isSatisfied(kind)).length;
    return challenge.value1 <= kindCount
  }

  isClearedDiscardCount(challenge, model){
    if(!model.isStalemate()){
      return false;
    }
    // アリティ の強制終了時には捨札条件をクリアさせない
    if(!model.isGracefullyStalemate){
      return false;
    }
    return model.graveyard.field.cards.length <= challenge.value1;
  }

  isClearedMinusTrickCount(challenge, model){
    const tricks = model.board.fields.reduce((sum, field)=>sum+field.minusTrickCount(), 0) + model.starPalette.fields.reduce((sum, field)=>sum+field.minusTrickCount(), 0);
    return challenge.value1 <= tricks;
  }

  isClearedBiggestStack(challenge, model){
    const maxStackSize = Math.max(...(model.starPalette.fields.map(field=>field.cards.length)));
    return challenge.value1 <= maxStackSize;
  }

  isClearedSandStormCount(challenge, model){
    const count = model.character.uniqueParameters.sandStormCount;
    return challenge.value1 <= count;
  }

  // 「すべての j を回収している」とは「ゲーム終了時、手札にも捨札にもボードにも j がない状態」である
  isClearedGetAllTreasure(challenge, model){
    return model.isStalemate() && 
      this.hasNoJewelCard(model.graveyard.field) && 
      this.hasNoJewelCard(model.hand.field) && 
      model.board.fields.every(field => this.hasNoJewelCard(field));
  }

  isClearedCompleteRun(challenge, model){
    return model.isStalemate() && !model.isForceStalemate;
  }

  isClearedSustainEnergyRange(challenge, model){
    const energyHistory = model.character.uniqueParameters.energyHistory;
    if(energyHistory === undefined){
      console.warn("character has no energy history but challenge SustainEnergyRange is set");
      return;
    }
    const min = challenge.value1;
    const max = challenge.value2;
    // 最後まで維持チャレンジの場合は両端を含まない
    return model.isStalemate() && energyHistory.every(energy=>this.isInRange(min, max, energy, false));
  }

  isClearedBeEnergyRange(challenge, model){
    const energyHistory = model.character.uniqueParameters.energyHistory;
    if(energyHistory === undefined){
      console.warn("character has no energy history but challenge SustainEnergyRange is set");
      return;
    }
    const min = challenge.value1;
    const max = challenge.value2;
    // 一回でもその範囲に入ればOKチャレンジは両端を含む
    return energyHistory.some(energy=>this.isInRange(min, max, energy, true));
  }

  isClearedDefeatEnemy(challenge, model){
    const enemies = model.character.uniqueParameters.enemies;
    if(enemies === undefined){
      console.warn("character has no enemies but challenge DefeatEnemy is set");
      return;
    }
    const enemyId = challenge.value1;
    const shouldOneShot = challenge.value2 !== 0;
    const shouldNoAbilityDamage = challenge.value3 === 1;
    const enemy = enemies.find(enemy=>enemy.id === enemyId);
    if(shouldOneShot && enemy.damageHistory.length !== 1){
      return false;
    }
    if(shouldNoAbilityDamage && enemy.damageHistory.some(damage=>damage.isAbilityDamage)){
      return false;
    }
    return enemy.hp <= 0;
  }

  isClearedDefeatEnemyCount(challenge, model){
    let enemies = model.character.uniqueParameters.enemies;
    if(enemies === undefined){
      console.warn("character has no enemies but challenge DefeatEnemyCount is set");
      return;
    }
    const count = challenge.value1;
    const requredRemainCardCount = challenge.value2;
    const shouldDoneByAbilityDamage = challenge.value3 !== 0;
    enemies = enemies.filter(enemy=>enemy.hp <= 0);
    if(shouldDoneByAbilityDamage){
      enemies = enemies.filter(enemy=>enemy.damageHistory[enemy.damageHistory.length - 1]?.isAbilityDamage === true)
    }
    if(model.deck.field.cards.length < requredRemainCardCount){
      return false;
    }
    return count <= enemies.length;
  }

  // private

  hasNoJewelCard(field){
    return field.cards.every(card => card.suit !== "j");
  }

  isInRange(min, max, value, includeBothEnds){
    if(includeBothEnds){
      return min <= value && value <= max;
    }
    else{
      return min < value && value < max;
    }
  }
};
