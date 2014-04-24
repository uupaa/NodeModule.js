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
function NodeModule_collectModuleData(param) { // @arg Object: { dir, result, develop, root }
                                               //    param.dir - PathString(= ""): search path.
                                               //    param.result - Object(= {}): result object.
                                               //    param.develop - Boolean(= false): true is search develop information.
                                               //    param.root - Boolean(= false): collect root module information.
                                               // @ret Object: search result.
                                               // @help: NodeModule.collectModuleData
    param = param || {};

    var dir = param["dir"] || "";
    var result = param["result"] || {
            "nodeFiles":              [], // file for node.js
            "workerFiles":            [], // file for worker
            "browserFiles":           [], // file for browser
            "dependenciesFiles":      [],
            "devDependenciesFiles":   [],
            "dependenciesModules":    [],
            "devDependenciesModules": []
        };
    var develop = param["develop"] || false;
    var root = param["root"] || false;

    return _collectModuleData(result, develop, root, dir, dir.length);
}

function _collectModuleData(result,      // @arg Object: { nodeFiles, ..., devDependenciesModules }
                            develop,     // @arg Boolean: true is develop
                            root,        // @arg Boolean: true is collect root module information.
                            dir,         // @arg String: search directory path.
                            cutLength) { // @arg Integer: path cut length.
                                         // @ret Object:

    var fileName = "package.json";
    var filesKeyword    = develop ? "devDependenciesFiles"   : "dependenciesFiles";
    var moduleKeyword   = develop ? "devDependenciesModules" : "dependenciesModules";
    var propertyKeyword = develop ? "devDependencies"        : "dependencies";

    var json = JSON.parse( fs["readFileSync"](dir + fileName) ); // load package.json

    if (json[propertyKeyword]) {
        Object.keys(json[propertyKeyword]).forEach(function(moduleName) {

            if (result[moduleKeyword].indexOf(moduleName) < 0) { // avoid duplicate
                var path = dir + "node_modules/" + moduleName + "/" + fileName;

                if (fs["existsSync"](path)) {
                    result[moduleKeyword].push(moduleName);
                    _collectModuleData(result, develop, root,
                                       dir + "node_modules/" + moduleName + "/", fileName);
                }
            }
        });
    }
    if (root || dir) { // Do not collect root module information.
        var build = json["x-build"] || json["build"];

        if (build) {
            var files     = build["files"] || build["inputs"] || null; // build.inputs was deprecated.
            var target    = (build["target"] || ["all"]).join(" "); // ["Browser", "Worker", "Node"]
            var toNode    = /(all|node)/i.test(target);
            var toWorker  = /(all|worker)/i.test(target);
            var toBrowser = /(all|browser)/i.test(target);

            files.forEach(function(file) {
                if (result[filesKeyword].indexOf(file) < 0) {
                    result[filesKeyword].push((dir + file).slice(cutLength));
                }
                if (toNode) {
                    if (result["nodeFiles"].indexOf(file) < 0) {
                        result["nodeFiles"].push((dir + file).slice(cutLength));
                    }
                }
                if (toWorker) {
                    if (result["workerFiles"].indexOf(file) < 0) {
                        result["workerFiles"].push((dir + file).slice(cutLength));
                    }
                }
                if (toBrowser) {
                    if (result["browserFiles"].indexOf(file) < 0) {
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

