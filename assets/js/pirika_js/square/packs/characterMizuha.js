let MizuhaDefault = require("./callbacks/mizuhaDefault");
let Mizuha1 = require("./callbacks/mizuha1");
let Mizuha2 = require("./callbacks/mizuha2");
let Mizuha3 = require("./callbacks/mizuha3");
let Mizuha4 = require("./callbacks/mizuha4");

module.exports = class CharacterMizuha {
  constructor(){
    this.id = 3;
    this.name = "ミズハ";
    this.imageName = "faily2";
    this.defaultMessage = "はい、ミズハです。\n今回も頑張っていきましょうね";
    this.uniqueParameters = {};
    this.defaultCallback = new MizuhaDefault();
    this.callbacks = {
      1: new Mizuha1(),
      2: new Mizuha2(),
      3: new Mizuha3(),
      4: new Mizuha4()
    }
  }

  getCallback(callbackName, index){
    console.log(callbackName, index)
    return this.callbacks[index][callbackName] || this.defaultCallback[callbackName];
  }
};
