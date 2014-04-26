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
                                               //   param.dir - PathString(= ""): search path.
                                               //   param.develop - Boolean(= false): true is search develop information.
                                               //
                                               // @ret Object: { files, nodeFiles, workerFiles, browserFiles, moduleList }
                                               //   return.files - PathStringArray: all files.
                                               //   return.nodeFiles - PathStringArray: Node.js files.
                                               //   return.workerFiles - PathStringArray: Worker files.
                                               //   return.browserFiles - PathStringArray: Browser files.
                                               //   return.moduleList - ModuleNameStringArray: [moduleName, ...]
                                               //
                                               // @help: NodeModule.collectModuleData
                                               // @spec: https://github.com/uupaa/NodeModule.js/wiki/CreateFileList
    param = param || {};

    var dir     = param["dir"]     || "";
    var develop = param["develop"] || false;

    var moduleDependencyTree = {};
    var moduleList = [];
    var buildSettings = {}

    if (develop) {
        _drillDownModules(dir, "package.json", 1, true, moduleDependencyTree);
    }
    _drillDownModules(dir, "package.json", 1, false, moduleDependencyTree);

    function _drillDownModules(dir, packagejson, currentDepth, develop, moduleDependencyTree) {
        var json = JSON.parse( fs["readFileSync"](dir + packagejson) ); // load package.json

        if (develop) {
            Object.keys(json["devDependencies"] || {}).forEach(_findChildenModules);
        }
        Object.keys(json["dependencies"] || {}).forEach(_findChildenModules);

        function _findChildenModules(moduleName) { // dependencyModuleName
            if (moduleList.indexOf(moduleName) < 0) {
                moduleList.push(moduleName);
            }
            if (!(moduleName in moduleDependencyTree)) {
                moduleDependencyTree[moduleName] = {};
            }

            var path = dir + "node_modules/" + moduleName + "/"; // childen module path

            if ( fs["existsSync"](path + packagejson) ) {
                var json = JSON.parse( fs["readFileSync"](path + packagejson) ); // load package.json
                var build = json["x-build"] || json["build"] || { "target": ["all"], "files": [] };

                if (!(moduleName in buildSettings)) {
                    buildSettings[moduleName] = {
                        "target":   build["target"],
                        "files":    build["files"].map(function(file) { return path + file; })
                    };
                }
                _drillDownModules(path, packagejson, currentDepth + 1, develop, moduleDependencyTree[moduleName]);
            }
        }
    }

    _sortModuleListByDependencyOrder(moduleList, moduleDependencyTree);

    var files = [];
    var nodeFiles = [];
    var workerFiles = [];
    var browserFiles = [];
    var cutLength = dir.length;

    moduleList.forEach(function(moduleName) {
        if (moduleName in buildSettings) {
            var build       = buildSettings[moduleName];
            var buildFiles  = build["files"];
            var buildTarget = build["target"].join(" "); // ["all", "browser", "worker", "node"]
            var toNode      = /(all|node)/i.test(buildTarget);
            var toWorker    = /(all|worker)/i.test(buildTarget);
            var toBrowser   = /(all|browser)/i.test(buildTarget);

            buildFiles.forEach(function(file) {
                var path = file.slice(cutLength);

                if (files.indexOf(file) < 0) {
                    files.push(path);
                }
                if (toNode && nodeFiles.indexOf(file) < 0) {
                    nodeFiles.push(path);
                }
                if (toWorker && workerFiles.indexOf(file) < 0) {
                    workerFiles.push(path);
                }
                if (toBrowser && browserFiles.indexOf(file) < 0) {
                    browserFiles.push(path);
                }
            });
        }
    });

    return {
        "files":        files,
        "nodeFiles":    nodeFiles,
        "workerFiles":  workerFiles,
        "browserFiles": browserFiles,
        "moduleList":   moduleList
    };
}

function _sortModuleListByDependencyOrder(moduleList, moduleDependencyTree) {
    return moduleList.sort(_sortFunction);

    function _sortFunction(a, b) {
        if (a in moduleDependencyTree && _isDependency(moduleDependencyTree, a, b)) {
            return 1;
        }
        if (b in moduleDependencyTree && _isDependency(moduleDependencyTree, b, a)) {
            return -1;
        }
        return 0;
    }

    function _isDependency(tree, // @arg Object: module dependency sub tree. { "uupaa.nodemodule.js": { ... }, ... }
                           a,    // @arg String: current module. "uupaa.nodemodule.js"
                           b) {  // @arg String: find target module. "uupaa.base64.js"
                                 // @ret Boolean: true is dependency.
                                 // @recursive:
        if (a in tree) {
            if (b in tree[a]) {
                return true;
            }
            for (var name in tree[a]) { // { console, valid, help, task, test, watch, plato, minify }
                if (tree[name] && _isDependency(tree[name], name, b)) {
                    return true;
                }
            }
        }
        return false;
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

