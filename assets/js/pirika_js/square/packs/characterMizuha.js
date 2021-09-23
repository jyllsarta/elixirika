module.exports = class CharacterMizuha {
  constructor(){
    this.id = 2;
    this.name = "ミズハ";
    this.imageName = "faily2";
    this.defaultMessage = "はい、ミズハです。\n今回も頑張っていきましょうね";
  }

  onGameStart(model){
    console.log("ミズハですー");
  }

  // model の状況では、 field の末尾に cardを積むことができる？
  cardStackRule(card, field, model){
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
