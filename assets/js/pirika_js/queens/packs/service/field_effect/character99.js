import AdditionalCard from './additional_card.js';

export class FieldEffectCharacter99 {
  onSendCard(state){
    const amount = new AdditionalCard().amount(state, true, false);

    // 追加カードを引く
    const cards = state.deck.drawMany(amount);
    cards.map(card=>card.reveal());
    if(cards){
      state.player.hand.addMany(cards);
    }
  }
};
export default FieldEffectCharacter99;
