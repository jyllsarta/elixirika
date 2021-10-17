module.exports = class StarPalette {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.fields = [];
  }

  status(){
    let status = [];
    this.fields.map(field=>status[field.cards.length]=true);
    return status;
  }

  statusAt(index){
    // 1, 5, "8+" みたいな特殊条件が書いてあることがある
    if(typeof(index) === "string" && index.slice(-1) === "+"){
      const threshold = parseInt(index.split("+")[0]) || Infinity;
      return this.fields.some(field=>threshold<=field.cards.length);
    }
    return this.status()[index] || false;
  }

  score(){
    return this.fields.reduce((x,y)=>x+y.score(), 0)
  }
};
