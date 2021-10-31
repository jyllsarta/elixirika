module.exports = class Character1_Default {
  onGameStart(character, model){
    console.log("ピリカだよー");
  }

  onSendCard(character, model, card){
  }

  onSendToStarPalette(character, model, field){
  }

  calculateScore(character, model){
    return model.starPalette.score();
  }

  igniteAbility(character, model, params){
    const abilityIndex = params;
    if(!character.uniqueParameters.abilities[abilityIndex]){
      console.warn(`cannot ignite ability. rest abilities: ${character.uniqueParameters.abilities} / index:${abilityIndex}`)
      return;
    }
    // Vue の監視しているArray なので、更新をかける場合は splice を使う
    const ability = character.uniqueParameters.abilities.splice(abilityIndex, 1)[0];
    ability.ignite(character, model);
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
};
