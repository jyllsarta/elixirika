import { Judgement } from "./judgement";

export class PhaseShowdown {
  enter(state){
    const turn_result = Judgement.judge(state.playerBoard, state.enemyBoard, state.board);
    console.log(turn_result);
    if(turn_result == "win"){
      state.enemyScore += state.pot;
      state.pot = 0;
    }
    else if(turn_result == "lose"){
      state.playerScore += state.pot;
      state.pot = 0;
    }
    // 引き分けは何もしない

    state.board.sendAllCardsTo(state.discard);
    state.playerBoard.sendAllCardsTo(state.discard);
    state.enemyBoard.sendAllCardsTo(state.discard);
  }

  nextPhase(state){
    if(state.playerScore >= 8 || state.enemyScore >= 8){
      state.phase = "game_end";
      return;
    }
    state.phase = "turn_start";
  }
};
export default PhaseShowdown;
