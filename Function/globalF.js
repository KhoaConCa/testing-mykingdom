const fs = require("fs");
const path = require("path");

var readGlobalData = async function (tcName) {
  const dataFilePath = `../Data/${tcName}D.json`;
  const content = fs.readFileSync(dataFilePath);
  const obj = JSON.parse(content);
  for (let index = 0; index < obj.length; index++) {
    if (tcName == obj[index]["testName"]) {
      return obj[index];
    }
  }
};

module.exports = { readGlobalData }