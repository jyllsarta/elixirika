import { EnemyAiGreedy } from "./enemyAiGreedy";

export class PhaseEnemySelect {
  enter(state){
    const ai = new EnemyAiGreedy();
    const cardIds = ai.select(state);
    state.enemyBoard.add(state.enemyHand.pickByCardId(cardIds[0]));
    state.enemyBoard.add(state.enemyHand.pickByCardId(cardIds[1]));
  }

  nextPhase(state){
    state.phase = "player_select";
  }
};
export default PhaseEnemySelect;
