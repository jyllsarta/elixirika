const LinearStrokeStrategy = require("./strokeStrategy/linearStrokeStrategy");

module.exports = class StrokeStrategyFactory {
  static getStrategy(type){
    switch(type){
      case "linear":
        return LinearStrokeStrategy;
    }
  }
};
