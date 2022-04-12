let Card = require("../card");
const Constants = require("../constants");

module.exports = class Character2_Default {
  onGameStart(character, model){
  }

  onSendToStarPalette(character, model, field){
    const { banSendCard } = character.getCallback("starPaletteParameter", model.chapter.index)();
    if(banSendCard){
      character.banSendCard(model, field);
    }
    model.calculateScore();
  }

  onSendCard(character, model, card, field){
    const { banCardGap } = character.getCallback("starPaletteParameter", model.chapter.index)();
    if(banCardGap){
      character.banCardGap(model, field);
    }
  }

  onFillDraw(character, model, sentCardLength){
    const { banDiscard } = character.getCallback("starPaletteParameter", model.chapter.index)();
    if(banDiscard){
      character.banDiscard(model, sentCardLength);
    }
  }

  calculateScore = (character, model) => {
    const restCardBonus = this.isClearedMainTarget(character, model) ? this.restCardBonus(model) : 0;
    return model.starPalette.score() + restCardBonus;
  }

  restCardBonus = (model) => {
    return model.deck.field.cards.length * Constants.restCardBonus;
  }

  isClearedMainTarget(character, model){
    return model.starPalette.arityStyleScore() >= Constants.maxArityStyleScore;
  }

  starPaletteParameter(){
    console.warn("アリティのパラメータはオーバーライド前提");
    return {
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
    return character.uniqueParameters.abilities?.some(ability=>ability.card?.category == "sender");
  }
};
