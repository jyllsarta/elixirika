module.exports = class Character1_Default {
  onGameStart(character, model){
  }

  onSendCard(character, model, card, field){
  }

  onSendToStarPalette(character, model, field){
    model.calculateScore();
  }

  onFillDraw(character, model, sentCardLength){
  }

  calculateScore(character, model){
    return model.starPalette.score();
  }

  isClearedMainTarget(character, model){
    const params = character.getCallback("starPaletteParameter", model.chapter.index)().kinds;
    return params.every(param=>model.starPalette.isSatisfied(param));
  }

  starPaletteParameter(){
    return {
      kinds: [
        {value: 1, order: 1},
        {value: 2, order: 1},
        {value: 3, order: 1},
        {value: 4, order: 1},
        {value: 5, order: 1},
        {value: 6, order: 1},
        {value: 7, order: 1},
        {value: 8, order: 1, upper: true},
      ]
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

  canGetSenderCardFromSkill(character, model){
    return character.uniqueParameters.abilities.some(ability=>ability.card?.category == "sender");
  }
};
