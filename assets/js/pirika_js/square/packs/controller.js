const Field = require("./field");
let Model = require("./model");

module.exports = class Controller {
  constructor() {
    this.model = null;
    this.operationHistory = [];
    if(typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'){
      window.controller = this;
    }
  }

  dumpOperaionHistory(){
    const logs = {
      operationHistory: this.operationHistory,
      seed: this.seed,
    }
    return logs;
  }

  getStatus(){
    return {
      score: this.model.starPalette.score(),
    }
  }

  loadOperationHistory(historyString){
    const operations = JSON.parse(historyString);

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
    this.operationHistory.push({arguments: Object.values(arguments), name: "fillDraw"})
    this.model.hand.disselectAllCard();
    this.model.hand.field.sendAllCardTo(this.model.graveyard.field)
    for(let i=0; i<4; ++i){
      this.model.hand.field.addCard(this.model.deck.field.draw());
    }
  }

  // 手札からボードへの提出 基本アクション
  sendHandToBoard(handIndex, boardIndex){
    this.operationHistory.push({arguments: Object.values(arguments), name: "sendHandToBoard"})
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
    this.operationHistory.push({arguments: Object.values(arguments), name: "commitSenderCard"})
    if(!this.model.board.isSendable(fieldIndex)){
      console.error("cannot send");
      return;
    }
    let newField = new Field();
    this.model.board.fields[fieldIndex].sendAllCardTo(newField);
    this.model.starPalette.fields.push(newField);
  }

  selectHand(handIndex){
    this.operationHistory.push({arguments: Object.values(arguments), name: "selectHand"})
    this.model.hand.disselectAllCard();
    this.model.hand.field.cards[handIndex]?.setSelected(true);
  }

  selectBoard(boardIndex){
    this.operationHistory.push({arguments: Object.values(arguments), name: "selectBoard"})
    if(!this.model.board.fields[boardIndex]){
      console.error(`no board field ${boardIndex}`);
      return;
    }
    this.model.selectingBoardIndex = boardIndex;
  }

  sendPlayLog(){
    let axios =  require("axios");
    axios.post("/square/register_log",{
              _csrf_token: document.querySelector("meta[name=csrf-token]").attributes["content"].textContent,
              username: localStorage.rawNameSquare,
              log: this.dumpOperaionHistory(),
              seed: this.seed,
          }
        )
        .then((results) => {
          console.log(results);
          console.log("OK");
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        })
  }  
};
