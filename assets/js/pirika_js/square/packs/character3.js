let Character3_Default = require("./callbacks/character3_default");
let Character3_1 = require("./callbacks/character3_1");
let Character3_2 = require("./callbacks/character3_2");
let Character3_3 = require("./callbacks/character3_3");
let Character3_4 = require("./callbacks/character3_4");

module.exports = class Character3 {
  constructor(){
    this.id = 3;
    this.name = "ラズ";
    this.defaultMessage = "ラズでーす♡。\n今回も頑張っていきましょうね";
    this.bgm = "bgm3";

    this.uniqueParameters = {
      abilities: [],
    };
    this.defaultCallback = new Character3_Default();
    this.callbacks = {
      1: new Character3_1(),
      2: new Character3_2(),
      3: new Character3_3(),
      4: new Character3_4()
    }
  }

  getCallback(callbackName, index){
    return this.callbacks[index][callbackName] || this.defaultCallback[callbackName];
  }
};
