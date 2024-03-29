class Ball {
  constructor(x, y, vx, vy, colorId) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.colorId = colorId;
    this.id = Math.floor(Math.random() * 10000000000);
    this.removedAt = null;
  }

  reflect() {
    if (this.x < 0) {
      this.vx *= -1;
      this.x = 0;
    }
    if (this.x > 1) {
      this.vx *= -1;
      this.x = 1;
    }
    if (this.y < 0) {
      this.vy *= -1;
      this.y = 0;
    }
    if (this.y > 1) {
      this.y = 0;
    }
  }
}
export default Ball;
