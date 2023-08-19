export class PhaseEnemySkill {
  enter(state){

  }

  nextPhase(state){
    state.board.sendAllCardsTo(state.discard);
    state.enemy.buffState.turnDecay();
    state.player.buffState.turnDecay();
    state.phase = "turn_start";
  }
};
export default PhaseEnemySkill;
