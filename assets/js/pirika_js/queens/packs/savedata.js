import Masterdata from "./masterdata.js"

export class Savedata {
  get(){
    // 開発環境なら自身をwindow.saveに入れる
    if(process.env.NODE_ENV === "development"){
      window.save = this;
    }
        
    const save = localStorage.queens_savedata;
    return save ? JSON.parse(save) : this.init();
  }

  write(afterObject){
    localStorage.queens_savedata = JSON.stringify(afterObject);
  }

  reset(){
    this.write(this.init());
  }

  unlockAll(){
    let save = this.get();
    const shopItems = Masterdata.getAll("shop_items");
    save.shopItems = {};
    for(let shopItem of shopItems){
      save.shopItems[shopItem.id] = true;
    }

    save.quests = {};
    const quests = Masterdata.getAll("quests");
    for(let quest of quests){
      save.quests[quest.id] = {win: 1, lose: 1};
    }

    save.coin = 9999;

    this.write(save);
  }

  update(key, value){
    let save = this.get();
    save[key] = value;
    this.write(save);
  }

  set(afterObject){
    let save = this.get();
    Object.assign(save, afterObject);
    this.write(save);
  }

  static playerParams(){
    const raw = new this().get().equipments;
    // targets, skills, instants それぞれ配列の要素が文字列なので、数値に変換する
    let playerParams = {};
    for(let key in raw){
      playerParams[key] = raw[key].map((value) => parseInt(value));
    }
    return playerParams;
  }

  static coin(){
    return new this().get().coin;
  }

  static consumeCoin(coin){
    let save = new this().get();
    save.coin -= coin;
    new this().write(save);
  }

  static hasShopItem(shopItemId){
    return new this().get().shopItems?.[shopItemId];
  }

  static buyShopItem(coin, shopItemId){
    let save = new this().get();
    save.coin -= coin;
    if(!save.shopItems){
      save.shopItems = {};
    }
    save.shopItems[shopItemId] = true;
    new this().write(save);
  }

  static isWin(questId){
    let save = new this().get();
    let questStatus = save.quests[questId];
    if(!questStatus){
      return false;
    }
    return questStatus.win > 0;
  }

  static loseCount(questIds){
    let save = new this().get();
    return questIds.filter((questId) => save.quests[questId]?.lose > 0).length;
  }

  static writeQuestResult(questId, isWin, rewardCoin){
    let save = new this().get();
    let questStatus = save.quests[questId] || {win: 0, lose: 0};
    if(isWin){
      questStatus.win++;
      save.coin += rewardCoin;
    }
    else{
      questStatus.lose++;
      // 敗北時のコインは入場タイミングで支払済
    }
    save.quests[questId] = questStatus;
    new this().write(save);
  }

  init(){
    return {
      quests: {
      },
      coin: 100,
      shopItems: {        
      },
      equipments: {
        targets: [2001],
        skills: [],
        instants: [],
      }
    }
  }
};

export default Savedata;