// マスターデータの bullets はパラメータ、こっちにあるのは画面にある実弾
// もしかしたらシングルトンなID払い出し機があると便利なのかも
module.exports = class Bullet {
  constructor(master) {
    this.master = master;
    this.x = master.x;
    this.y = master.y;
    this.type = master.type;
    this.strokes = master.strokes;
  }

  moveOneTurn(){
    for(let stroke of this.strokes){
      this.x += stroke.dx;
      this.y += stroke.dy;
    }
  }
};
