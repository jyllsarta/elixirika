let PirikaDefault = require("./callbacks/pirikaDefault");

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
  }

  getCallback(callbackName, _chapterId){
    // TODO: chapterId をみて defaultCallback 以外の特殊コールバックが存在しないかチェックし、あるならそれ、ないならデフォルトを返させる
    return this.defaultCallback[callbackName];
  }
};
