import {Savedata} from "../savedata";

export class PhaseGameEnd {
  enter(state){
    state.uiState.prevPersistentData = {...state.persistentData};
    // 負け
    if(state.player.score >= 8){
      state.persistentData.playerBankroll -= state.player.score;
      state.persistentData.enemyBankroll += state.player.score;
      this.writeToSave(false);
    }
    // 勝ち
    else{
      state.persistentData.playerBankroll += state.enemy.score;
      state.persistentData.enemyBankroll -= state.enemy.score;
      this.writeToSave(true);
    }
  }

  writeToSave(result){
    let save = new Savedata().get();
    if(result){
      save.stages[1].win++;
    }
    else{
      save.stages[1].lose++;
    }
    new Savedata().write(save);
  }

  nextPhase(state){
    if(state.persistentData.enemyBankroll <= 0){
      state.persistentData.winCount++;
      state.persistentData.enemyBankroll = 50;
      state.phase = "unstarted";
      return;
    }
    state.phase = "setup";
  }
};
export default PhaseGameEnd;
