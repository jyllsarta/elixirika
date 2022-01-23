let Card = require("../card");
const Constants = require("../constants");

module.exports = class Character4_Default {
  onGameStart(character, model){
    console.log("あかねですー");
    const { enemies } = character.getCallback("starPaletteParameter", model.chapter.index)();
    character.initializeEnemy(enemies);
  }

  onSendCard(character, model, card){
  }

  onSendToStarPalette = (character, model, field) => {
    const power = field.cards.length;
    character.damageToNextEnemy(power, model, false);
    character.uniqueParameters.mp += field.score();
    if(character.isAllEnemyDefeated()){
      model.setForceStalemate("見事 敵を全滅させた！");
    }
  }

  onFillDraw(character, model){
    // シールドはドローしたタイミングで復活する
    let nextEnemy = character.uniqueParameters.enemies.find(enemy=>enemy.hp>0);
    if(!nextEnemy){
      console.warn("no target!")
      return;
    }
    if(nextEnemy.shield === 0){
      nextEnemy.shield = nextEnemy.shieldMax;
    }
  }

  calculateScore(character, model){
    return model.starPalette.score();
  }

  starPaletteParameter(){
    return {
      enemies: [
        {id: 1, hp: 1, image: "kani", shield: 3},
        {id: 2, hp: 5, image: "gob", shield: 1},
        {id: 3, hp: 5, image: "kani"},
        {id: 4, hp: 5, image: "gob"},
        {id: 5, hp: 5, image: "ghost"},
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
    return character.uniqueParameters.mp >= Constants.costOfAbilityAddSenderCard;
  }
};
