let Controller = require("./controller");

const operationHistory = process.argv[2];

const controller = new Controller();
controller.loadOperationHistory(operationHistory)
const status = controller.getStatus();
console.log(status);

let fs = require("fs");

// TODO: write_resultそのままだと絶対名前コンフリクトするのでseedか何かに散らす
fs.writeFile("/tmp/write_result.json", JSON.stringify(status), "utf8", (error) => {
  if (error) {
    console.log(JSON.stringify(error));
  }
});
