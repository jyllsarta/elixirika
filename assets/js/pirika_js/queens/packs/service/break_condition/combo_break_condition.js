export class ComboBreakCondition {
  getCountReduction(state, board, condition, card){
    // コンボ数がカードの数値と同じか(break判定時はboardにはまだcardが入っていないので+1する)
    if(board.cards.length + 1 === condition.param1){
      console.log("combo matched");
      return 1;
    }
    return 0;  
  }

  stringRepresentation(condition){
    return `combo(${condition.param1})`;
  }
};
export default ComboBreakCondition;
