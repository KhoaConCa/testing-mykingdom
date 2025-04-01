const fs = require("fs");
const path = require("path");

var readGlobalData = async function (path, tcName) {
  const dataFilePath = `../Data/${path}D.json`;
  const content = fs.readFileSync(dataFilePath);
  const obj = JSON.parse(content);
  for (let index = 0; index < obj.length; index++) {
    if (tcName == obj[index]["testName"]) {
      return obj[index];
    }
  }
};

module.exports = { readGlobalData }