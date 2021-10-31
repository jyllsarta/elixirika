let Card = require("../card");
let AbilityAddCard = require("../AbilityAddCard");

module.exports = class Character3_4 {
  onGameStart(character, model){
    console.log("最強ミズハさんです");
    character.uniqueParameters.abilities = [
      new AbilityAddCard(new Card( 0, "X", "special")),
      new AbilityAddCard(new Card( 0, "X", "special")),
      new AbilityAddCard(new Card( 11, "s", "sender")),
      new AbilityAddCard(new Card( 11, "h", "sender")),
    ]
  }

  starPaletteParameter(){
    return {
      kinds: [
        {value: 7, order: 1, upper: true},
        {value: 7, order: 2, upper: true},
        {value: 7, order: 3, upper: true},
        {value: 7, order: 4, upper: true},
        {value: 7, order: 5, upper: true},
        {value: 7, order: 6, upper: true},
        {value: 7, order: 7, upper: true},
      ]
    };
  }

  // ミズハ4はピリカのアビリティも使える
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
    // ミズハ の チャプター4だけ更に特別で、マイナス2まで乗せられる
    // 3 の上に 1 を乗せるのが合法
    if(lastCard.number - 2 > card.number){
      return false;
    }
    return true;
  }
};
