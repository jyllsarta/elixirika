export class PhaseEnemySelect {
  enter(state){
    state.enemy.hand.cards.forEach(card => card.reveal());
  }
  
  needsContinue(state){
    return state.enemy.hand.cards.length > 0;
  }

  continue(state, controller){
    console.log("enemy select phase");
    controller.operate("processEnemySelectPhase");
    const delay = state.enemy.hand.cards.length === 0 ? 700 : 200;
    return {delay: delay};
  }

  nextPhase(state){
    state.phase = "enemy_skill";
  }
};
export default PhaseEnemySelect;
