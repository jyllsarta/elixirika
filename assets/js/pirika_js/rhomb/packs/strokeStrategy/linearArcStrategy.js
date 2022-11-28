module.exports = class LinearArcStrategy {
  static strokes(x1, y1, x2, y2, length) {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) / length;
    const ux = (x2 - x1) / distance;
    const uy = (y2 - y1) / distance;

    return [
      { dx: ux / 10, dy: uy / 10 },
      { dx: uy / 5, dy: ux / 5 },
      { dx: ux / 10, dy: uy / 10 },
      { dx: -uy / 10, dy: -ux / 10 },
      { dx: ux / 10, dy: uy / 10 },
      { dx: ux / 10, dy: uy / 10 },
      { dx: -uy / 5, dy: -ux / 5 },
      { dx: ux / 10, dy: uy / 10 },
      { dx: uy / 10, dy: ux / 10 },
      { dx: ux / 10, dy: uy / 10 },
    ];
  }
};
