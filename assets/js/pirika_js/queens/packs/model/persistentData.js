import Masterdata from "../masterdata";

export class PersistentData {
  constructor(questId){
    console.log(questId);
    console.log(Masterdata.idTables.quests);
    this.enemyBankroll = Masterdata.idTables.quests[questId].enemy_coin;
    this.playerBankroll = 10;
    this.winCount = 0;
  }

  isGameEnd(){
    return this.enemyBankroll <= 0 || this.playerBankroll <= 0;
  }

  isWin(){
    return this.enemyBankroll <= 0 && this.playerBankroll > 0;
  }

  isLose(){
    return this.enemyBankroll > 0 && this.playerBankroll <= 0;
  }
};
export default PersistentData;
