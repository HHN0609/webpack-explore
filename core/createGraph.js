const createAsset = require("./createAsset");
const path = require("path");

/**
 * 
 * @param {string} entry 一个绝对路径
 */
function createGraph(entry) {
    const mainAsset = createAsset(entry);
    // console.log(mainAsset);

    // fullpath => it's asset 的map
    // 是一个global的变量
    // 是扁平的，无嵌套
    const graph = {
        [entry]: mainAsset
    }
    // console.log(graph);

    // fullpath是一个带文件名的绝对路径
    for(const fullpath in graph){
        const asset = graph[fullpath];
        recursionDep(fullpath, asset);
    }
    console.log(graph);
    return graph;


    
    function recursionDep(fullpath, asset) {
        // 跟踪依赖文件，这个mapping和asset的deps有不同，mapping中的路径是fullpath
        // 相对路径 => 绝对路径的map
        asset.mapping = {};

        // deps中的相对路径 => 绝对路径
        const dirname = path.dirname(fullpath);
        asset.deps.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath).replace(/\\/g, "/");
            asset.mapping[relativePath] = absolutePath;

            if(!graph[absolutePath]){
                const childAsset = createAsset(absolutePath);
                graph[absolutePath] = childAsset;
                // 子asset还有依赖就递归遍历
                if(childAsset.deps.length > 0){
                    recursionDep(absolutePath, childAsset);
                }
            }
        });
    }
}

module.exports = createGraph;
