export class Savedata {
  get(){
    const save = localStorage.queens_savedata;
    return save ? JSON.parse(save) : this.init();
  }

  write(afterObject){
    localStorage.queens_savedata = JSON.stringify(afterObject);
  }

  reset(){
    this.write(this.init());
  }

  static writeQuestResult(questId, isWin){
    let save = new this().get();
    let questStatus = save.quests[questId] || {win: 0, lose: 0};
    if(isWin){
      questStatus.win++;
    }
    else{
      questStatus.lose++;
    }
    save.quests[questId] = questStatus;
    new this().write(save);
  }

  init(){
    return {
      quests: {
      },
      coin: 100,
    }
  }
};

export default Savedata;