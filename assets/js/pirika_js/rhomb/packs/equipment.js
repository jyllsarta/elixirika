// マスターデータの equipments はパラメータ、こっちにあるのは画面にある実スキル
// もしかしたらシングルトンなID払い出し機があると便利なのかも
module.exports = class Equipment {
  constructor(master) {
    this.master = master;
    // なんかこの辺のマスタから書き写してくる処理はマスターデータ実エンティティとしての共通処理化したほうがいいのかも？
    // 重複所持を考えるとマスタのIDじゃなくてID発行体に任せたい
    this.id = master.id;
    this.name = master.name;
    this.bullet_alignments = master.bullet_alignments;
    this.tp = master.tp;
    this.tp_gain = master.tp_gain;
    this.tp_initial = master.tp;
  }
};
