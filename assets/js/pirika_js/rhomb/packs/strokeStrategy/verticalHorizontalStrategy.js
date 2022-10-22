module.exports = class VerticalHorizontalStrategy {
  static strokes(x1, y1, x2, y2, length){
    const dx = (x2 - x1);
    const dy = (y2 - y1);

    if(Math.abs(dx) >= Math.abs(dy)){
        return [
            {dx: this.bound(-length, dx, length), dy: 0},
        ];
    }
    return [
        {dx: 0, dy: this.bound(-length, dy, length)},
    ];
  }

  static bound(min, x, max){
    if(x < min){
      return min;
    }
    if(x > max){
      return max;
    }
    return x;
  }
};
