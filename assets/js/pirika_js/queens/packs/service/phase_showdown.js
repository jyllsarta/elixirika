import { Judgement } from "./judgement";

export class PhaseShowdown {
  enter(state){
    const turn_result = Judgement.judge(state.playerBoard, state.enemyBoard, state.board);
    console.log(turn_result);
    state.board.sendAllCardsTo(state.discard);
    state.playerBoard.sendAllCardsTo(state.discard);
    state.enemyBoard.sendAllCardsTo(state.discard);
  }

  nextPhase(state){
    state.phase = "turn_start";
  }
};
export default PhaseShowdown;
