import Masterdata from "../masterdata.js";

export class PhaseTurnStart {
  enter(state){
    state.discard.sendAllCardsTo(state.deck);
    state.deck.shuffle();
    state.deck.cards.forEach(card => card.hide());

    const defalutDrawCount = 5;
    let playerDrawCount = defalutDrawCount + state.player.buffState.getBuffValue("draw");
    playerDrawCount = Math.min(Math.max(playerDrawCount, 0), 10);

    let enemyDrawCount = defalutDrawCount + state.enemy.buffState.getBuffValue("draw");
    enemyDrawCount = Math.min(Math.max(enemyDrawCount, 0), 10);

    for(let i = 0; i < playerDrawCount; i++){
      state.player.hand.add(state.deck.draw());
    }

    for(let i = 0; i < enemyDrawCount; i++){
      state.enemy.hand.add(state.deck.draw());
    }

    state.player.hand.cards.forEach(card => card.reveal());
    state.enemy.hand.cards.slice(-1)[0].reveal();

    state.fieldEffectActivateCount = 0;

    this._updateScript(state);
  }

  nextPhase(state){
    state.phase = "player_select";
  }

  _updateScript(state){
    // 1ターン目ならwelcome, それ以外ならturnStart
    const messageKey = state.turn === 0 ? "welcome" : "turnStart";
    const message = Masterdata.getByCondition("character_scripts", {when: messageKey, character_id: state.quest.character_id, order: state.quest.order})[0].message;
    state.updateScript(message, messageKey);
  }
};
export default PhaseTurnStart;
