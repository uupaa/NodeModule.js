// @name: NodeModule.js
// @require: Valid.js
// @cutoff: @assert @node

(function(global) {
"use strict";

// --- variable --------------------------------------------
var fs = require("fs");

var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function NodeModule() { // @help: NodeModule
}

NodeModule["repository"] = "https://github.com/uupaa/NodeModule.js";

NodeModule["collectModuleData"] = NodeModule_collectModuleData; // NodeModule.collectModuleData(param:Object = null):Object

// --- implement -------------------------------------------
function NodeModule_collectModuleData(param) { // @arg Object: { dir, develop }
                                               //    param.dir - PathString(= ""): search path.
                                               //    param.develop - Boolean(= false): true is search develop information.
                                               // @ret Object: result.
                                               // @help: NodeModule.collectModuleData
    param = param || {};

    var dir     = param["dir"]     || "";
    var develop = param["develop"] || false;

    return _collectModuleData(develop, root, dir, dir.length);
}

function _collectModuleData(develop,     // @arg Boolean: true is develop
                            root,        // @arg Boolean: true is collect root module information.
                            dir,         // @arg String: search directory path.
                            cutLength) { // @arg Integer: path cut length.
                                         // @ret Object:
                                         // @spec: https://github.com/uupaa/NodeModule.js/wiki/CreateFileList
    var packageFileName = "package.json";

    // --- create devModuleTree or moduleTree ---
    var devModuleTree = {};
    var moduleTree    = {};
    var buildSettings = {}; // { moduleName: { files, output, target }, ... }
    var maxDepth      = 1;
    var depthObject = { "1": [] };

    if (develop) {
        _drillDownModules(dir, 1, true);
    }
    _drillDownModules(dir, 1, false);

    // --- create mergedTree ---
    var mergedTree    = {};

    for (var key in devModuleTree) {
        mergedTree[key] = devModuleTree[key];
    }
    for (var key in moduleTree) {
        mergedTree[key] = moduleTree[key];
    }

    // --- create moduleList ---
    var moduleList = [];
    var depthKeys = Object.keys(depthObject).sort(function(a, b) { return b - a; }); // ["4", "3", "2", "1"]

    for (var i = 0, iz = depthKeys.length; i < iz; ++i) {
        var depth = depthKeys[i];

        for (var j = 0, jz = depthObject[depth].length; j < jz; ++j) {
            var module = depthObject[depth][j];

            if (moduleList.indexOf(module) < 0) {
                moduleList.push(module);
            }
        }
    }

    var nodeFiles = [];
    var workerFiles = [];
    var browserFiles = [];

    moduleList.forEach(function(moduleName) {
        var build     = buildSettings[moduleName];
        var files     = build["files"];
        var target    = build["target"].join(" "); // ["all", "browser", "worker", "node"]
        var toNode    = /(all|node)/i.test(target);
        var toWorker  = /(all|worker)/i.test(target);
        var toBrowser = /(all|browser)/i.test(target);

        files.forEach(function(file) {
            if (toNode) {
                if (nodeFiles.indexOf(file) < 0) {
                    nodeFiles.push(file.slice(cutLength));
                }
            }
            if (toWorker) {
                if (workerFiles.indexOf(file) < 0) {
                    workerFiles.push(file.slice(cutLength));
                }
            }
            if (toBrowser) {
                if (browserFiles.indexOf(file) < 0) {
                    browserFiles.push(file.slice(cutLength));
                }
            }
        });
    });

    return {
        "nodeFiles":        nodeFiles,      // file for node.js
        "workerFiles":      workerFiles,    // file for worker
        "browserFiles":     browserFiles,   // file for browser
        "moduleList":       moduleList,
        "moduleTree":       moduleTree,
        "devModuleTree":    devModuleTree
    };


    function _drillDownModules(dir, currentDepth, develop) {
        if (maxDepth < currentDepth) {
            maxDepth = currentDepth;
            depthObject[currentDepth] = [];
        }
        var json = JSON.parse( fs["readFileSync"](dir + packageFileName) ); // load package.json
        var keyword = develop ? "devDependencies" : "dependencies";

        if (json[keyword]) { // search devDependencies modules
            Object.keys(json[keyword]).forEach(function(moduleName) {

                var path = dir + "node_modules/" + moduleName + "/";

                if (fs["existsSync"](path + packageFileName)) {
                    depthObject[currentDepth].push(moduleName);

                    if (develop) {
                        devModuleTree[moduleName] = {};
                    } else {
                        moduleTree[moduleName] = {};
                    }

                    var json = JSON.parse( fs["readFileSync"](path + packageFileName) ); // load package.json
                    var build = json["x-build"] || json["build"] || { "target": ["all"], "files": [] };

                    buildSettings[moduleName] = {
                        "target":   build["target"],
                        "files":    build["files"].map(function(file) { return path + file; })
                    };
                    _drillDownModules(path, currentDepth + 1, develop);
                }
            });
        }
    }
}

// --- export ----------------------------------------------
//{@node
if (_inNode) {
    module["exports"] = NodeModule;
}
//}@node
if (global["NodeModule"]) {
    global["NodeModule_"] = NodeModule; // already exsists
} else {
    global["NodeModule"]  = NodeModule;
}

})((this || 0).self || global);

