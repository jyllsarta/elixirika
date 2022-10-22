module.exports = class LinearStrokeStrategy {
  static strokes(x1, y1, x2, y2, length){
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const dx = (x2 - x1) * length / distance;
    const dy = (y2 - y1) * length / distance;

    return [
        {dx: dx, dy: dy},
    ];
  }
};
