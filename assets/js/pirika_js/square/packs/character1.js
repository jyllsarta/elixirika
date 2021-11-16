let Character1_Default = require("./callbacks/character1_default");
let Character1_1 = require("./callbacks/character1_1");
let Character1_2 = require("./callbacks/character1_2");
let Character1_3 = require("./callbacks/character1_3");
let Character1_4 = require("./callbacks/character1_4");
let AbilityAddCard = require("./abilityAddCard");
let Card = require("./card");

module.exports = class Character1 {
  constructor(){
    // TODO: 今後キャラマスタ・セリフマスタに移動していく
    this.id = 1;
    this.name = "ピリカ";
    this.imageName = "character1";
    this.defaultMessage = "はーい！こんにちは\nまずはカード出してみてね";

    this.uniqueParameters = {
      // X X 11s 11h を追加する事ができる残り回数
      abilities: [
        new AbilityAddCard(new Card( 0, "X", "special")),
        new AbilityAddCard(new Card( 0, "X", "special")),
        new AbilityAddCard(new Card( 11, "s", "sender")),
        new AbilityAddCard(new Card( 11, "h", "sender")),
      ]
    }

    this.defaultCallback = new Character1_Default();
    this.callbacks = {
      1: new Character1_1(),
      2: new Character1_2(),
      3: new Character1_3(),
      4: new Character1_4()
    }
  }

  getCallback(callbackName, index){
    return this.callbacks[index][callbackName] || this.defaultCallback[callbackName];
  }
};
