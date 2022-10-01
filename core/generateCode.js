
/**
 * 根据graph生成能在浏览器端运行的模块代码
 * @param {object} graph 
 * @return {string} 
 */
function generateCode(graph) {
    let modules = "";
    for (const fullpath in graph) {
        const asset = graph[fullpath];
        modules += `'${fullpath}': [
            function(require, module, exports) {
                ${asset.code}
            },
            ${JSON.stringify(asset.mapping)},
        ]`;
    }

    const result = `
    (function(modules){

      function require(moduleId){
        const [fn,mapping] = modules[moduleId];
  
        //获取map映射的值,即 key-value 的value 
        function localRequire(name){
          return require(mapping[name]);
        }

        const module = {exports:{}};
        fn(localRequire,module,module.exports);
        return module.exports;
      }

      require('${entry}')
    })({${modules}})`;

    return result;
}

module.exports = generateCode;
