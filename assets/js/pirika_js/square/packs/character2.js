let Character2_Default = require("./callbacks/character2_default");
let Character2_1 = require("./callbacks/character2_1");
let Character2_2 = require("./callbacks/character2_2");
let Character2_3 = require("./callbacks/character2_3");
let Character2_4 = require("./callbacks/character2_4");


module.exports = class Character2 {
  constructor(){
    this.id = 2;
    this.name = "すずらん";
    this.imageName = "faily";
    this.defaultMessage = "ふええ";

    this.uniqueParameters = {
      // X X 11s 11h を追加する事ができる残り回数
      restAbilityCount: [1, 1, 1, 1]
    }
    this.defaultCallback = new Character2_Default();
    this.callbacks = {
      1: new Character2_1(),
      2: new Character2_2(),
      3: new Character2_3(),
      4: new Character2_4()
    }
  }

  getCallback(callbackName, index){
    console.log(callbackName, index)
    return this.callbacks[index][callbackName] || this.defaultCallback[callbackName];
  }
};
