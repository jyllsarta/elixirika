const StrokeStrategyFactory = require("./strokeStrategyFactory");

// マスターデータの bullets はパラメータ、こっちにあるのは画面にある実弾
// もしかしたらシングルトンなID払い出し機があると便利なのかも
module.exports = class Bullet {
  constructor(master) {
    this.master = master;
    this.x = master.x;
    this.y = master.y;
    this.type = master.type;
    this.speed = master.speed;
    this.strategy = master.strategy;
    // こちらの与えるダメージ
    this.power = master.power;
    // 被弾時のダメージ
    this.powerToPlayer = master.powerToPlayer;
    this.markedAt = null;
    // FIXME: 0, 800 に自機が存在する決め打ち
    this.strokes = StrokeStrategyFactory.getStrategy(this.strategy).strokes(this.x, this.y, 0, 800, this.speed);
  }

  moveOneTurn(){
    for(let stroke of this.strokes){
      this.x += stroke.dx;
      this.y += stroke.dy;
    }
    // FIXME: 0, 800 に自機が存在する決め打ち
    this.strokes = StrokeStrategyFactory.getStrategy(this.strategy).strokes(this.x, this.y, 0, 800, this.speed);
  }

  isHitToPlayer(){
    return this.x <= 400 && this.y >= 400;
  }

  isBonusBullet(){
    return this.type === "bonus";
  }

  mark(at){
    this.markedAt = at;
  }

  partialStrokeAppliedPosition(ratio){
    const strokes = this.partialStrokes(ratio);
    let position = {x: this.x, y: this.y};
    for(let stroke of strokes){
      position.x += stroke.dx;
      position.y += stroke.dy;
    }
    return position;
  }

  // 線分の長さで考えて先端から ratio の割合だけ切り取ったstrokes
  partialStrokes(ratio){
    let strokes = [];
    const strokesWithLength = this.strokes.map(s=>{return {dx: s.dx, dy:s.dy, length: s.dx ** 2 + s.dy ** 2}});
    const totalLength = strokesWithLength.reduce((iter, s)=>iter + s.length, 0);

    let remainLength = totalLength * ratio;
    for(let stroke of strokesWithLength){
      if(stroke.length <= remainLength){
        strokes.push(stroke);
        remainLength -= stroke.length;
      }
      else{
        let remainRatio = remainLength / stroke.length;
        strokes.push({dx: stroke.dx * remainRatio, dy: stroke.dy * remainRatio, length: stroke.length * remainRatio});
        remainLength = 0;
      }
    }
    return strokes;
  }

  // private
};
