class Pointer{
  constructor(x,y){
    this.id = Math.floor(Math.random() * 10000000000);
  }

  setPosition(x, y){
    this.x = x;
    this.y = y;
  }
}
export default Pointer;
