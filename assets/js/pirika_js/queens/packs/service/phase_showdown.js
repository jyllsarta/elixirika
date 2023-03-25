export class PhaseShowdown {
  enter(state){
    state.board.sendAllCardsTo(state.discard);
    state.playerBoard.sendAllCardsTo(state.discard);
    state.enemyBoard.sendAllCardsTo(state.discard);
  }

  nextPhase(state){
    state.phase = "turn_start";
  }
};
export default PhaseShowdown;
