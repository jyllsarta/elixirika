let Card = require("../card");

module.exports = class Character4_Default {
  onGameStart(character, model){
    console.log("あかねですー");
    const { enemies } = character.getCallback("starPaletteParameter", model.chapter.index)();
    character.initializeEnemy(enemies);
  }

  onSendCard(character, model, card){
  }

  onSendToStarPalette(character, model, field){
  }

  calculateScore(character, model){
    return model.starPalette.score();
  }

  starPaletteParameter(){
    return {
      enemies: [
        {hp: 1},
        {hp: 3},
        {hp: 5},
        {hp: 6},
        {hp: 7},
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
};
