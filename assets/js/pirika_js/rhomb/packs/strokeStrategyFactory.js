const LinearStrategy = require("./strokeStrategy/linearStrategy");
const LinearArcStrategy = require("./strokeStrategy/linearArcStrategy");
const VerticalHorizontalStrategy = require("./strokeStrategy/verticalHorizontalStrategy");
const RandomWalkStrategy = require("./strokeStrategy/randomWalkStrategy");

module.exports = class StrokeStrategyFactory {
  static getStrategy(type){
    switch(type){
      case "linear":
        return LinearStrategy;
      case "linearArc":
        return LinearArcStrategy;
      case "verticalHorizontal":
        return VerticalHorizontalStrategy;
      case "randomWalk":
        return RandomWalkStrategy;
    }
  }
};
