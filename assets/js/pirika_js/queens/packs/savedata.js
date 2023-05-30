export class Savedata {
  get(){
    const save = localStorage.queens_savedata;
    return save ? JSON.parse(save) : this.init();
  }

  write(afterObject){
    localStorage.queens_savedata = JSON.stringify(afterObject);
  }

  reset(){
    this.write(this.init());
  }

  init(){
    return {
      stages: {
        1: {win: 0, lose: 0},
        2: {win: 0, lose: 0},
        3: {win: 0, lose: 0},
        4: {win: 0, lose: 0},
      }
    }
  }
};

export default Savedata;