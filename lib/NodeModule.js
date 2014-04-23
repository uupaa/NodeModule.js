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

NodeModule["load"] = NodeModule_load; // NodeModule.load(dir:String = "", result:Object = {}):Object

// --- implement -------------------------------------------
function NodeModule_load(dir,      // @arg PathString(= ""): search path.
                         result) { // @arg Object(= {}): result object.
    dir = dir || "";
    result = result || {
            "files":                  [], // all files
            "nodeFiles":              [], // file for node.js
            "workerFiles":            [], // file for worker
            "browserFiles":           [], // file for browser
            "dependenciesModules":    [],
            "devDependenciesModules": []
        };

    _loadModule(result, true,  dir, dir.length);
    _loadModule(result, false, dir, dir.length);

    return result;
}

function _loadModule(result,      // @arg Object: { nodeFiles, ..., devDependenciesModules }
                     develop,     // @arg Boolean: true is develop
                     dir,         // @arg String: search directory path.
                     cutLength) { // @arg Integer: path cut length.
                                  // @ret Object:

    var moduleKeyword   = develop ? "devDependenciesModules" : "dependenciesModules";
    var propertyKeyword = develop ? "devDependencies"        : "dependencies";
    var fileName = "package.json";

    var json = JSON.parse( fs["readFileSync"](dir + fileName) ); // load package.json

    if (json[propertyKeyword]) {
        Object.keys(json[propertyKeyword]).forEach(function(moduleName) {

            if (result[moduleKeyword].indexOf(moduleName) < 0) { // avoid duplicate
                var path = dir + "node_modules/" + moduleName + "/" + fileName;

                if (fs["existsSync"](path)) {
                    result[moduleKeyword].push(moduleName);
                    _loadModule(result, develop,
                                dir + "node_modules/" + moduleName + "/", fileName);
                }
            }
        });
    }
    if (dir) {
        var build = json["x-build"] || json["build"];

        if (build) {
            var files     = build["files"] || build["inputs"] || null; // build.inputs was deprecated.
            var target    = (build["target"] || ["Browser", "Worker", "Node"]).join(" ");
            var toNode    = /node/i.test(target);
            var toWorker  = /worker/i.test(target);
            var toBrowser = /browser/i.test(target);

            files.forEach(function(file) {
                if (result["files"].indexOf(file) < 0) { // avoid duplicate
                    result["files"].push(dir + file);

                    if (toNode) {
                        result["nodeFiles"].push((dir + file).slice(cutLength));
                    }
                    if (toWorker) {
                        result["workerFiles"].push((dir + file).slice(cutLength));
                    }
                    if (toBrowser) {
                        result["browserFiles"].push((dir + file).slice(cutLength));
                    }
                }
            });
        }
    }
    return result;
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

