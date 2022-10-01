const fs = require("fs");
const { parse, traverse, transformFromAst } = require("@babel/core");
const path = require("path");

/**
 * 构建asset
 * @param {path} filename 一个绝对路径
 * @returns string[], string
 */
function createAsset(filename) {
    // 读取文件内容
    const content = fs.readFileSync(filename, "utf-8");

    // 把文件内容转换成AST语法树
    const ast = parse(content, {
        sourceType: "module"
    });

    // 当前文件的依赖的路径
    const deps = [];
    // 遍历这个文件内容的所有依赖，并将其**依赖路径(一般是相对路径)**添加到deps数组中
    traverse(ast, {
        ImportDeclaration: ({node}) => {
            deps.push(node.source.value);
        }
    });

    // 把生成的AST转换成浏览器可以运行的语法
    const { code } = transformFromAst(ast, undefined, {
        presets: ["@babel/env"]
    });

    return {
        deps,
        code
    }

}

module.exports = createAsset;
