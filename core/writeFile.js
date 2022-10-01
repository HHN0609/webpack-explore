const fs = require("fs");
const path = require("path");

function writeFileToDist(path, result) {
    fs.writeFile(path, result, (err) => {
        if(err){
            throw err;
        } else {
            console.log("文件已保存");
        }
    })
}

module.exports = writeFileToDist;
