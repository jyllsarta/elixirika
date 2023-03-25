export class Judgement {
  static judge(playerBoard, enemyBoard, board){
    const target = board.targetValue();
    const player = playerBoard.targetValue(target);
    const enemy = enemyBoard.targetValue(target);

    // 引き分けは同値の場合のみで、それ以外は必ず決着する
    if(player == enemy){
      return "draw";
    }

    // バースト & バースト は 超過量がマシな方が勝ち
    if(player > target && enemy > target){
      if(player > enemy){
        return "lose";
      }
      else{
        return "win";
      }
    }

    // 片方バーストはバーストしていないほうが勝ち
    if(player > target && enemy < target){
      return "lose";
    }
    if(player < target && enemy > target){
      return "win";
    }

    // 両方バーストしていなければ、数値の大きい方が勝ち
    if(player > enemy){
      return "win";
    }
    else{
      return "lose";
    }
  }
};
export default Judgement;
