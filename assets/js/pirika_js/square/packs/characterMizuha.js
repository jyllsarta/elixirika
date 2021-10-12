let MizuhaDefault = require("./callbacks/mizuhaDefault");

module.exports = class CharacterMizuha {
  constructor(){
    this.id = 3;
    this.name = "ミズハ";
    this.imageName = "faily2";
    this.defaultMessage = "はい、ミズハです。\n今回も頑張っていきましょうね";
    this.uniqueParameters = {};
    this.defaultCallback = new MizuhaDefault();
  }

  getCallback(callbackName, _chapterId){
    // TODO: chapterId をみて defaultCallback 以外の特殊コールバックが存在しないかチェックし、あるならそれ、ないならデフォルトを返させる
    return this.defaultCallback[callbackName];
  }
};
