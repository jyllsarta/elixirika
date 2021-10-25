module.exports = class Character3_Default {
  onGameStart(character, model){
    console.log("ミズハですー");
  }

  igniteAbility(character, model, params){
    console.warn("わ、私は固有スキル持ってません...");
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

  // model の状況では、 field の末尾に cardを積むことができる？
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
    // ミズハは特別に、数値をマイナス1したカードを乗せることができる
    // 3 の上に 2 を乗せるのが合法
    if(lastCard.number - 1 > card.number){
      return false;
    }
    return true;
  }
};
