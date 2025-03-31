var fs = require("fs");
const content = fs.readFileSync("./data.json");
const obj = JSON.parse(content);
console.log(obj);
console.log(obj[1].data);
console.log(obj.length);