const Message = require("./message");

module.exports = class MessageManager {
  constructor(model){
    this.model = model;
    this.messageMaster = new Message();
    this.currentMessage = {};
    // this.priority = 0; // 競合に困ったらこの値以下のプライオリティのregisterを無視するように実装してみる
  }

  register(when){
    const records = this.messageMaster.getBySituation(this.model.characterId, when, this.model.chapter.index);
    // ロジックに関わらない部分なので天然の乱数を使う
    const record = records[Math.floor(Math.random() * records.length)];
    this.currentMessage = record;
  }

  // メッセージ競合に困ったら1誘発が終わったところでこれを呼んで再度上書き可能にする
  //resetPriority(){}
};
