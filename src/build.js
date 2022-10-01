const { entry, output } = require("./config.js");
const createGraph = require("../core/createGraph.js");
const generateCode = require("../core/generateCode.js");
const fs = require("fs");
const writeFileToDist = require("../core/writeFile.js");

let { path, filename } = output;
let graph = createGraph(entry);
let result = generateCode(graph);

fs.access(`${path}/${filename}`, err => {
    if(!err) {
        writeFileToDist(`${path}/${filename}`, result);
    } else {
        fs.mkdir(outPath, { recursive: true }, err => {
            if (err) throw err;
            writeFile(`${path}/${filename}`, result);
          });
    }
})


