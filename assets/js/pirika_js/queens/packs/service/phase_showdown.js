import { Judgement } from "./judgement";

export class PhaseShowdown {
  enter(state){
    const turnResult = Judgement.judge(state.board, state.player.board, state.enemy.board);
    state.lastRoundResult = turnResult;
  }

  nextPhase(state){
    const turnResult = Judgement.judge(state.board, state.player.board, state.enemy.board);
    console.log(turnResult);
    if(turnResult == "win"){
      state.enemy.score += state.pot;
      state.enemy.specialPoint += state.pot;
      state.pot = 0;
    }
    else if(turnResult == "lose"){
      state.player.score += state.pot;
      state.player.specialPoint += state.pot;
      state.pot = 0;
    }
    // 引き分けは何もしない

    state.board.sendAllCardsTo(state.discard);
    state.player.board.sendAllCardsTo(state.discard);
    state.enemy.board.sendAllCardsTo(state.discard);

    if(state.deck.cards.length < 15){
      state.discard.sendAllCardsTo(state.deck);
      state.deck.shuffle();
    }

    if(state.player.score >= 8 || state.enemy.score >= 8){
      state.phase = "game_end";
      return;
    }
    state.phase = "turn_start";
  }
};
export default PhaseShowdown;
