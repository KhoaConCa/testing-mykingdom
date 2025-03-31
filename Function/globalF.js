const fs = require("fs");
const path = require("path");
const dataFilePath = "../Data/registerD.json";

var readGlobalData = async function (tcName) {
  const content = fs.readFileSync(dataFilePath);
  const obj = JSON.parse(content);
  for (let index = 0; index < obj.length; index++) {
    if (tcName == obj[index]["testName"]) {
      console.log(obj[index])
      return obj[index];
    }
  }
};

module.exports = { readGlobalData }