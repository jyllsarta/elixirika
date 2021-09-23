class GlobalIdFactory {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.currentId = 10000;
  }

  next(){
    return this.currentId++;
  }
};

// 外に露出するのはインスタンスそのものとする
module.exports = new GlobalIdFactory();