let Field = require("./field");
const Constants = require("./constants");

module.exports = class StagedField {
  constructor() {
    this.initiate();
  }

  initiate(){
    // ボードインデックスとかぶらないIDを振っておく
    this.field = new Field(100);
    // 手札の何枚目から来たのかの記憶
    this.stagedCardIsFromIndex = 0;
  }

  isStaged(){
    return this.field.cards.length !== 0;
  }

  memoryStagedCardIsFrom(index){
    this.stagedCardIsFromIndex = index;
  }

  isSendable(){
    // カードがなければ置けちゃう、あればダメ
    return this.field.cards.length === 0;
  }
};
