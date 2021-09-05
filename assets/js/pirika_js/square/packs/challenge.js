module.exports = class Challenge {
  // マスタの仕組みができるまでベタ打ち
  getAll(){
    return [
      {
        id: 1,
        type: "point",
        value1: 200,
        title: "200ポイント取得しよう",
        description: "200ポイント以上の状態でゲームを終了する。",
      },
      {
        id: 2,
        type: "point",
        value1: 500,
        title: "500ポイント取得しよう",
        description: "500ポイント以上の状態でゲームを終了する。",
      },
      {
        id: 3,
        type: "starPaletteKind",
        value1: 4,
        title: "4つ星座盤を埋めよう",
        description: "星座盤に4種類以上カードを提出した状態でゲームを終了する。",
      },
      {
        id: 4,
        type: "starPaletteKind",
        value1: 6,
        title: "6つ星座盤を埋めよう",
        description: "星座盤に6種類以上カードを提出した状態でゲームを終了する。",
      },
    ]
  }

  // model の状態を解析してクリアした実積のIDのリストを返す
  clearedChallengeIds(model){
    const challenges = this.getAll();
    const pointChallenges = this.clearedPointChallengeIds(model, challenges.filter(challenge=>challenge.type=="point"));
    // TODO: starPaletteKindに対応
    return pointChallenges;
  }

  clearedPointChallengeIds(model, pointChallenges){
    const score = model.starPalette.score();
    return pointChallenges
      .filter(challenge=>challenge.value1<=score)
      .map(challenge=>challenge.id)
  }
};
