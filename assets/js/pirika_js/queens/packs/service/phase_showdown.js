import { Judgement } from "./judgement";

export class PhaseShowdown {
  enter(state){
    const turnResult = Judgement.judge(state.board, state.playerBoard, state.enemyBoard);
    state.lastRoundResult = turnResult;
  }

  nextPhase(state){
    const turnResult = Judgement.judge(state.board, state.playerBoard, state.enemyBoard);
    console.log(turnResult);
    if(turnResult == "win"){
      state.enemyScore += state.pot;
      state.enemySpecialPoint += state.pot;
      state.pot = 0;
    }
    else if(turnResult == "lose"){
      state.playerScore += state.pot;
      state.playerSpecialPoint += state.pot;
      state.pot = 0;
    }
    // 引き分けは何もしない

    state.board.sendAllCardsTo(state.discard);
    state.playerBoard.sendAllCardsTo(state.discard);
    state.enemyBoard.sendAllCardsTo(state.discard);

    if(state.deck.cards.length < 15){
      state.discard.sendAllCardsTo(state.deck);
      state.deck.shuffle();
    }

    if(state.playerScore >= 8 || state.enemyScore >= 8){
      state.phase = "game_end";
      return;
    }
    state.phase = "turn_start";
  }
};
export default PhaseShowdown;
