module.exports = class Sight {
  constructor() {
    this.updatePosition(0, 0);
  }

  updatePosition(x, y){
    this.x = x;
    this.y = y;
  }
};
