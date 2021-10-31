let Character4_Default = require("./callbacks/character4_default");
let Character4_1 = require("./callbacks/character4_1");
let Character4_2 = require("./callbacks/character4_2");
let Character4_3 = require("./callbacks/character4_3");
let Character4_4 = require("./callbacks/character4_4");
let AbilityAddCard = require("./abilityAddCard");
let Card = require("./card");


module.exports = class Character2 {
  constructor(){
    this.id = 4;
    this.name = "あかね";
    this.imageName = "faily";
    this.defaultMessage = "ふええええ！";

    this.uniqueParameters = {
      abilities: [
        new AbilityAddCard(new Card( 0, "X", "special")),
        new AbilityAddCard(new Card( 0, "X", "special")),
        new AbilityAddCard(new Card( 11, "s", "sender")),
        new AbilityAddCard(new Card( 11, "h", "sender")),
      ]
    }
    this.defaultCallback = new Character4_Default();
    this.callbacks = {
      1: new Character4_1(),
      2: new Character4_2(),
      3: new Character4_3(),
      4: new Character4_4()
    }
  }

  getCallback(callbackName, index){
    console.log(callbackName, index)
    return this.callbacks[index][callbackName] || this.defaultCallback[callbackName];
  }
};
