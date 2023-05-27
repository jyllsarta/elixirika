export class PersistentData {
  constructor(){
    this.enemyBankroll = 10;
    this.playerBankroll = 10;
    this.winCount = 0;
  }

  isGameEnd(){
    return this.enemyBankroll <= 0 || this.playerBankroll <= 0;
  }
};
export default PersistentData;
