let Field = require("./field");
const Constants = require("./constants");

module.exports = class StagedField {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.field = new Field(100);
  }

  isSendable(){
    // カードがなければ置けちゃう、あればダメ
    return this.field.cards.length === 0;
  }
};
