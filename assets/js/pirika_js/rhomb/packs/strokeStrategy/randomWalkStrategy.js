module.exports = class RandomWalkStrategy {
  static strokes(x1, y1, x2, y2, length){
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) / length;
    const ux = (x2 - x1) / distance;
    const uy = (y2 - y1) / distance;

    let strokes = [];
    for(let i = 0; i < 10; ++i){
        let stroke = this.randomWalk(ux, uy, length / 10);
        strokes.push(stroke);
    }
    return strokes;
  }

  static randomWalk(ux, uy, length){
    const radian = Math.atan2(ux, uy);
    const flucture = 180 * (Math.random() - 0.5) * Math.PI / 180; //180度までぶれる
    const vector = {dx: Math.sin(radian + flucture) * length, dy: Math.cos(radian + flucture) * length};
    console.log(vector);
    return vector;
  }
};
