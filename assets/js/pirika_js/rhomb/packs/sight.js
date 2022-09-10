module.exports = class Sight {
  constructor() {
    this.updatePosition(0, 0);
    this.isLocking = false;
  }

  updatePosition(x, y){
    this.x = x;
    this.y = y;
  }

  setLockingMode(mode){
    this.isLocking = mode;
  }
};
