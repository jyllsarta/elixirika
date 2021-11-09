let Card = require("../card");

module.exports = class Character2_Default {
  onGameStart(character, model){
    console.log("すずらんですー");
  }

  onSendToStarPalette = (character, model, field) => {
    const { maxEnergy, sandStorm, staleMateByEnergy } = character.getCallback("starPaletteParameter", model.chapter.index)();
    this.fluctuateEnergy(character, maxEnergy, field.score());

    if(sandStorm){
      this.shufflePocket(character, model);
    }
    if(staleMateByEnergy && character.uniqueParameters.energy >= maxEnergy){
      model.isForceStaleMate = true;
    }
  }

  // class 内で this 使うとコールバックで発動したときは this が windowになってるシチュエーションがあるので、 function ではなく アロー関数で定義を行う
  onSendCard = (character, model, card) => {
    const { consumptionPerCard, scoreRanges, maxEnergy, staleMateByEnergy } = character.getCallback("starPaletteParameter", model.chapter.index)();
    this.addScore(character, model, scoreRanges);
    this.fluctuateEnergy(character, maxEnergy, -consumptionPerCard)
    if(staleMateByEnergy && character.uniqueParameters.energy <= 0){
      model.isForceStaleMate = true;
    }
  }

  calculateScore(character, model){
    return character.uniqueParameters.score;
  }

  starPaletteParameter(){
    return {
      consumptionPerCard: 3,
      maxEnergy: 100,
      scoreRanges: [
        {min: 40, max: 60, score: 5},
        {min: 20, max: 80, score: 3},
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
    console.log(Math.floor(x / 4) % 2);
    return coldAbility && Math.floor(x / 4) % 2 === 0;
  }

  // private

  addScore = (character, model, scoreRanges) => {
    for(let scoreRange of scoreRanges){
      console.log(scoreRange)
      if(this.inRange(character.uniqueParameters.energy, scoreRange)){
        console.log(scoreRange.score)
        character.uniqueParameters.score += scoreRange.score;
        return;
      }
    }
  }

  // 上位評価に対して引っかかりやすくゆるめに評価するためにrangeは両側を含ませる
  inRange = (value, scoreRange) => {
    return scoreRange.min <= value && value <= scoreRange.max;
  }

  fluctuateEnergy = (character, maxEnergy, delta) => {
    character.uniqueParameters.energy += delta;
    if(character.uniqueParameters.energy < 0){
      character.uniqueParameters.energy = 0;
    }
    if(character.uniqueParameters.energy > maxEnergy){
      character.uniqueParameters.energy = maxEnergy;
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
};
