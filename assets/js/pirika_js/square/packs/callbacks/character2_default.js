let Card = require("../card");
const Constants = require("../constants");

module.exports = class Character2_Default {
  onGameStart(character, model){
    console.log("すずらんですー");
  }

  onSendToStarPalette = (character, model, field) => {
    const { maxEnergy, sandStorm, staleMateByEnergy } = character.getCallback("starPaletteParameter", model.chapter.index)();
    this.fluctuateEnergy(character, maxEnergy, field.score(), model);
    if(sandStorm){
      this.shufflePocket(character, model);
    }
    if(staleMateByEnergy && character.uniqueParameters.energy >= maxEnergy){
      model.setForceStalemate("エネルギー過供給で災害を起こしてしまった！");
    }
  }

  // class 内で this 使うとコールバックで発動したときは this が windowになってるシチュエーションがあるので、 function ではなく アロー関数で定義を行う
  onSendCard = (character, model, card) => {
    const { consumptionPerCard, scoreRanges, maxEnergy, staleMateByEnergy } = character.getCallback("starPaletteParameter", model.chapter.index)();
    this.addScore(character, model, scoreRanges);
    this.fluctuateEnergy(character, maxEnergy, -consumptionPerCard, model);
    character.uniqueParameters.energyHistory.push(character.uniqueParameters.energy);
    if(staleMateByEnergy && character.uniqueParameters.energy <= 0){
      model.setForceStalemate("エネルギー枯渇で災害を起こしてしまった！");
    }
  }

  // class 内で this 使うとコールバックで発動したときは this が windowになってるシチュエーションがあるので、 function ではなく アロー関数で定義を行う
  onFillDraw = (character, model) => {
    const { consumptionPerDraw, maxEnergy, staleMateByEnergy } = character.getCallback("starPaletteParameter", model.chapter.index)();
    this.fluctuateEnergy(character, maxEnergy, -consumptionPerDraw, model);
    character.uniqueParameters.energyHistory.push(character.uniqueParameters.energy);
    if(staleMateByEnergy && character.uniqueParameters.energy <= 0){
      model.setForceStalemate("エネルギー枯渇で災害を起こしてしまった！");
    }
  }

  calculateScore(character, model){
    return character.uniqueParameters.score;
  }

  starPaletteParameter(){
    return {
      consumptionPerCard: 1,
      consumptionPerDraw: 10,
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

  // character, model の状況では、field の末尾に cardを積むことができる？
  cardStackRule(character, model, card, field){
    if(!field){
      return false;
    }
    if(field.cards.length === 0){
      return true;
    }
    const lastCard = field.getLastCard();
    // X のカードはどのカードにも重ねられるし、どのカードも重ねることができる
    if(lastCard.isSpecialCard() || card.isSpecialCard()){
      return true;
    }
    if(lastCard.isSenderCard()){
      return false;
    }
    if(lastCard.color() == card.color()){
      return false;
    }
    if(lastCard.number > card.number){
      return false;
    }
    return true;
  }

  isAbilityColded = (character, model) => {
    const { coldAbility } = character.getCallback("starPaletteParameter", model.chapter.index)();
    const x = model.deck.field.cards.length;
    console.log(Math.floor(x / 4) % 2 === 0);
    return coldAbility && Math.floor(x / 4) % 2 === 0;
  }

  // private

  addScore = (character, model, scoreRanges) => {
    for(let scoreRange of scoreRanges){
      if(this.inRange(character.uniqueParameters.energy, scoreRange)){
        character.uniqueParameters.score += scoreRange.score;
        return;
      }
    }
  }

  // 上位評価に対して引っかかりやすくゆるめに評価するためにrangeは両側を含ませる
  inRange = (value, scoreRange) => {
    return scoreRange.min <= value && value <= scoreRange.max;
  }

  fluctuateEnergy = (character, maxEnergy, delta, model) => {
    const prevEnergy = character.uniqueParameters.energy;
    character.uniqueParameters.energy += delta;
    if(character.uniqueParameters.energy < 0){
      character.uniqueParameters.energy = 0;
    }
    if(character.uniqueParameters.energy > maxEnergy){
      character.uniqueParameters.energy = maxEnergy;
    }
    if(Constants.bestEnergyLowLimit <= prevEnergy && character.uniqueParameters.energy < Constants.bestEnergyLowLimit){
      model.messageManager.register("specialAbilityLowEnergy");
    }
    if(prevEnergy <= Constants.bestEnergyHighLimit && Constants.bestEnergyHighLimit < character.uniqueParameters.energy){
      model.messageManager.register("specialAbilityHighEnergy");
    }
  }

  // デッキに入れて、シャッフルして、デッキから引いてくる
  shufflePocket = (character, model) => {
    const filledPockets = character.uniqueParameters.abilities?.filter(ability=>ability.category === "cardPocket" && ability.card !== null);
    for(let pocket of filledPockets){
      model.deck.field.cards.push(pocket.card);
      pocket.card = null;
    }
    model.deck.shuffle(model.seededRandom)
    for(let pocket of filledPockets){
      let card = model.deck.field.cards.pop();
      pocket.card = card;
    }
    character.uniqueParameters.sandStormCount += filledPockets.length;
  }

  canGetSenderCardFromSkill(character, model){
    return character.uniqueParameters.abilities?.some(ability=>ability.card?.category == "sender");
  }
};
