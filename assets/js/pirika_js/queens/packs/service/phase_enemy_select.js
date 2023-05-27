import { EnemyAiGreedy } from "./enemyAiGreedy";

export class PhaseEnemySelect {
  enter(state){
    const ai = new EnemyAiGreedy();
    const cardIds = ai.select(state);
    state.enemy.board.add(state.enemy.hand.pickByCardId(cardIds[0]));
    state.enemy.board.add(state.enemy.hand.pickByCardId(cardIds[1]));
  }

  nextPhase(state){
    state.phase = "player_select";
  }
};
export default PhaseEnemySelect;
