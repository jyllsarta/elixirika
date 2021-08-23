let Model = require("./model");

module.exports = class Initiator {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.model = new Model();
  }

  getModel(){
    return this.model;
  }
};
