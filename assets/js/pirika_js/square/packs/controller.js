const Field = require("./field");
let Model = require("./model");

module.exports = class Controller {
  constructor() {
    this.model = null;
    window.controller = this;
  }

  dumpOperaionHistory(){
    const history = {
      operationHistory: this.operationHistory,
      seed: this.seed,
    }
    return JSON.stringify(history);
  }

  loadOperationHistory(historyString){
    operations = JSON.parse(historyString);
    console.log(history);

    this.model = new Model();
    this.model.deck.shuffle(operations.seed);
    
    for(let operation of operations.operationHistory){
      this[operation.name](...operation.arguments);
    }
  }

  newGame(){
    this.model = new Model();
    this.seed = Math.floor(Math.random() * 1000000000);
    this.model.deck.shuffle(this.seed);
    this.operationHistory = [];
    return this.model;
  }

  // 手札の引き直し
  // 手札を全て墓地に送る・デッキから引けるだけ引く
  fillDraw(){
    this.operationHistory.push({arguments: Object.values(arguments), name: arguments.callee.name})
    this.model.hand.disselectAllCard();
    this.model.hand.field.sendAllCardTo(this.model.graveyard.field)
    for(let i=0; i<4; ++i){
      this.model.hand.field.addCard(this.model.deck.field.draw());
    }
  }

  // 手札からボードへの提出 基本アクション
  sendHandToBoard(handIndex, boardIndex){
    this.operationHistory.push({arguments: Object.values(arguments), name: arguments.callee.name})
    const card = this.model.hand.field.cards[handIndex];
    if(!this.model.board.isStackable(card, boardIndex)){
      console.error("cannot stack this card!");
      return;
    }
    card.setSelected(false);
    this.model.hand.field.sendCardById(card.id, this.model.board.fields[boardIndex]);
    if(card.isSenderCard()){
      console.log("auto commit");
      this.commitSenderCard(boardIndex);
    }
  }

  // ∞カード(ようは絵札) が積まれているボードを指定し、星座盤へ送る
  commitSenderCard(fieldIndex){
    this.operationHistory.push({arguments: Object.values(arguments), name: arguments.callee.name})
    if(!this.model.board.isSendable(fieldIndex)){
      console.error("cannot send");
      return;
    }
    let newField = new Field();
    this.model.board.fields[fieldIndex].sendAllCardTo(newField);
    this.model.starPalette.fields.push(newField);
  }

  selectHand(handIndex){
    this.operationHistory.push({arguments: Object.values(arguments), name: arguments.callee.name})
    this.model.hand.disselectAllCard();
    this.model.hand.field.cards[handIndex]?.setSelected(true);
  }

  selectBoard(boardIndex){
    this.operationHistory.push({arguments: Object.values(arguments), name: arguments.callee.name})
    if(!this.model.board.fields[boardIndex]){
      console.error(`no board field ${boardIndex}`);
      return;
    }
    this.model.selectingBoardIndex = boardIndex;
  }
};
