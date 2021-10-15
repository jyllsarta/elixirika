let PirikaDefault = require("./callbacks/pirikaDefault");
let Pirika1 = require("./callbacks/pirika1");
let Pirika2 = require("./callbacks/pirika2");
let Pirika3 = require("./callbacks/pirika3");
let Pirika4 = require("./callbacks/pirika4");

module.exports = class CharacterPirika {
  constructor(){
    // TODO: 今後キャラマスタ・セリフマスタに移動していく
    this.id = 1;
    this.name = "ピリカ";
    this.imageName = "faily";
    this.defaultMessage = "はーい！こんにちは\nまずはカード出してみてね";

    this.uniqueParameters = {
      // X X 11s 11h を追加する事ができる残り回数
      restAbilityCount: [1, 1, 1, 1]
    }
    this.defaultCallback = new PirikaDefault();
    this.callbacks = {
      1: new Pirika1(),
      2: new Pirika2(),
      3: new Pirika3(),
      4: new Pirika4()
    }
  }

  getCallback(callbackName, index){
    console.log(callbackName, index)
    return this.callbacks[index][callbackName] || this.defaultCallback[callbackName];
  }
};
