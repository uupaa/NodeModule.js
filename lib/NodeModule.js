// @name: NodeModule.js
// @require: none
// @cutoff: @node

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

NodeModule["files"]                 = NodeModule_files;                 // NodeModule.files(param:Object = null):Object
NodeModule["collectPackageData"]    = NodeModule_collectPackageData;    // NodeModule.collectPackageData(param:Object):Object
NodeModule["removeToolModules"]     = NodeModule_removeToolModules;     // NodeModule.removeToolModules(pakcageData:Object):Object
NodeModule["resolveDependencyTree"] = NodeModule_resolveDependencyTree; // NodeModule.resolveDependencyTree(pakcageData:Object):Object
NodeModule["createSortedFileList"]  = NodeModule_createSortedFileList;  // NodeModule.createSortedFileList(pakcageData:Object, tree:Object):Object
NodeModule["uniqueArray"]           = NodeModule_uniqueArray;           // NodeModule.uniqueArray(source:Array):Object

// --- implement -------------------------------------------
function NodeModule_files(param) { // @arg Object: { dir, ignore, develop }
    param = param || {};

    var data  = NodeModule_removeToolModules( NodeModule_collectPackageData(param) );
    var tree  = NodeModule_resolveDependencyTree(data);
    var files = NodeModule_createSortedFileList(data, param["develop"] ? tree["develop"]
                                                                       : tree["release"]);
//console.log("\u001b[31m" + "data: " + JSON.stringify(data, null, 2));
//console.log("\u001b[33m" + "tree: " + JSON.stringify(tree, null, 2));
//console.log("\u001b[32m" + "files: " + JSON.stringify(files, null, 2) + "\u001b[0m");

    return files; // { all, node, worker, browser }
}

function NodeModule_collectPackageData(param) { // @arg Object: { dir, ignore, develop }
                                               //   param.dir - PathString(= ""): search path.
                                               //   param.ignore - ModuleNameArray(= []): ["uupaa.watch.js", ...]
                                               //   param.develop - Boolean(= false): true is search develop information.
                                               // @ret Object: PackageObject: package.json data. { json, tree, list }
                                               // @help: NodeModule.collectPackageData
    var dir         = param["dir"]     || "";
    var ignore      = param["ignore"]  || [];
    var develop     = param["develop"] || false;
    var cutoff      = dir.length;
    var treeData    = {};
    var moduleList  = [];
    var packageData = {};

    _collect(dir, develop, packageData, treeData);

    return {
        "json": packageData,
        "tree": treeData,
        "list": moduleList
    };

    function _collect(dir, develop, packageData, treeData) {
        var path = dir + "package.json";

        if ( !fs["existsSync"](path) ) {
            return;
        }

        var json  = JSON.parse( fs["readFileSync"](path) ); // load package.json
        var name  = json["name"]
        var build = json["x-build"] || json["build"];
        var files = (build["files"] || build["inputs"] || []).map(function(file) {
                        return (dir + file).slice(cutoff);
                    });

        if ( !(name in packageData) ||
             packageData[name]["build"]["files"][0].length > files[0].length ) { // overwrite

            // pickup module build setting.
            packageData[name] = {
                "name": name,
                "build": {
                    "files":    files,
                    "target":   build["target"],
                    "module":   build["module"] || { "develop": [], "release": [] }
                },
                "dependencies":     json["dependencies"],
                "devDependencies":  json["devDependencies"]
            };

            if (develop) {
                // --- module.develop = unique(merge(module.develop, module.release)) ---
                var module = packageData[name]["build"]["module"];

                if (module["develop"].length && module["release"].length) {
                    module["develop"] = NodeModule_uniqueArray( module["develop"].concat(module["release"]) ).unique;
                }
            }
        }

        if (develop) {
            Object.keys(json["devDependencies"] || {}).forEach(_next);
        }
        Object.keys(json["dependencies"] || {}).forEach(_next);

        function _next(name) {
            if (ignore.indexOf(name) < 0) {
                var foundNewModule = moduleList.indexOf(name) < 0;

                if (foundNewModule) {
                    moduleList.push(name);
                }
                treeData[name] = {};
                _collect(dir + "node_modules/" + name + "/", develop, packageData, treeData[name]);
            }
        }
    }
}

function NodeModule_removeToolModules(packageData) { // @arg Object: NodeModule.collectPackageData() result value
                                                     // @ret Object: packageData
                                                     // @help: NodeModule.removeToolModules
    packageData["list"] = packageData["list"].reduce(function(result, module) {
                if (!packageData["json"][module]["build"]["target"].join("").length) {
                    return result;
                }
                result.push(module);
                return result;
            }, []);

    return packageData;
}

function NodeModule_resolveDependencyTree(packageData) { // @arg Object: NodeModule.collectPackageData() result value
                                                         // @ret Object: { develop, relase }
                                                         //   packageData.develop - Object: develop build dependency object tree.
                                                         //   packageData.release - Object: release build dependency object tree.
                                                         // @help: NodeModule.resolveDependencyTree
                                                         // @desc: resolve module tree by dependency order
    var json = packageData["json"];
    var tree = packageData["tree"];
    var dependencyData = { "develop": {}, "release": {} };

    ["develop", "release"].forEach(function(type) {
        for (var moduleName in tree) {
            dependencyData[type][moduleName] = {};
            _next(moduleName, tree[moduleName], dependencyData[type][moduleName], type);
        }
    });
    return dependencyData;

    function _next(moduleName, tree, dependencyData, type) {
        if (moduleName in json) {
            var buildModuleNames = json[moduleName]["build"]["module"][type];

            if (buildModuleNames.length) {
                buildModuleNames.forEach(function(name) {
                    if (name in tree) {
                        dependencyData[name] = {};
                        _next(name, tree[name], dependencyData[name], type);
                    }
                });
            }
        }
    }
}

function NodeModule_createSortedFileList(packageData, // @arg Object: NodeModule.data() result value
                                         tree) {      // @arg Object: NodeModule.dependency() result value.
                                                      // @ret Object: { all, node, worker, browser }
                                                      //   return.all - PathStringArray: all files.
                                                      //   return.node - PathStringArray: Node.js files.
                                                      //   return.worker - PathStringArray: Worker files.
                                                      //   return.browser - PathStringArray: Browser files.
                                                      // @help: NodeModule.createSortedFileList
    var json = packageData["json"];
    var list = _sortModuleListByDependencyOrder(packageData["list"], tree);

    var all = [];
    var node = [];
    var worker = [];
    var browser = [];

    list.forEach(function(name) {
        if (name in json) {
            var build       = json[name]["build"];
            var buildFiles  = build["files"];
            var buildTarget = build["target"].join(" "); // ["all", "browser", "worker", "node"]
            var toNode      = /(all|node)/i.test(buildTarget);
            var toWorker    = /(all|worker)/i.test(buildTarget);
            var toBrowser   = /(all|browser)/i.test(buildTarget);

            buildFiles.forEach(function(file) {
                if (all.indexOf(file) < 0) {
                    all.push(file);
                }
                if (toNode && node.indexOf(file) < 0) {
                    node.push(file);
                }
                if (toWorker && worker.indexOf(file) < 0) {
                    worker.push(file);
                }
                if (toBrowser && browser.indexOf(file) < 0) {
                    browser.push(file);
                }
            });
        }
    });

    return {
        "all":      all,
        "node":     node,
        "worker":   worker,
        "browser":  browser
    };
}

function _sortModuleListByDependencyOrder(list, tree) {
    return list.slice().sort(_sortFunction);

    function _sortFunction(a, b) {
        if (a in tree && _isDependency(tree, a, b)) {
            return 1;
        }
        if (b in tree && _isDependency(tree, b, a)) {
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

function NodeModule_uniqueArray(source) { // @arg Array
                                          // @ret Object: { unique:Array, dup:Array }
                                          // @help: NodeModule.uniqueArray
    var unique = [], dup = [], i = 0, iz = source.length;

    for (; i < iz; ++i) {
        unique.indexOf(source[i]) >= 0 ? dup.push(source[i])
                                       : unique.push(source[i]);
    }
    return { unique: unique, dup: dup };
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

