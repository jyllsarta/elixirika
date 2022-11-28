let Controller = require("./controller");

const operationHistory = process.argv[2];
const seed = process.argv[3];

const controller = new Controller();
controller.loadOperationHistory(operationHistory);
const status = controller.getStatus();
console.log(status);

let fs = require("fs");

fs.writeFile(
  `/tmp/square_result_${seed}.json`,
  JSON.stringify(status),
  "utf8",
  (error) => {
    if (error) {
      console.log(JSON.stringify(error));
    }
  },
);
console.log("SUCCESS: write result completed!");
