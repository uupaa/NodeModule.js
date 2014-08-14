(function(global) {
"use strict";

// --- dependency modules ----------------------------------
var fs = require("fs");

// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function NodeModule() {
}

//{@dev
NodeModule["repository"] = "https://github.com/uupaa/NodeModule.js";
//}@dev

// --- convenient ---
NodeModule["files"]                 = NodeModule_files;                 // NodeModule.files(param:Object = null):Object

// --- raw ---
NodeModule["loadPackageJSON"]       = NodeModule_loadPackageJSON;       // NodeModule.loadPackageJSON(file:PathString):Object/null
NodeModule["validatePackageJSON"]   = NodeModule_validatePackageJSON;   // NodeModule.validatePackageJSON(file:PathString, pkg:Object):TypeError/null
NodeModule["collectPackageData"]    = NodeModule_collectPackageData;    // NodeModule.collectPackageData(param:Object):Object
NodeModule["removeDevToolModules"]  = NodeModule_removeDevToolModules;  // NodeModule.removeDevToolModules(pakcageData:Object):Object
NodeModule["resolveDependencyTree"] = NodeModule_resolveDependencyTree; // NodeModule.resolveDependencyTree(pakcageData:Object):Object
NodeModule["createSortedFileList"]  = NodeModule_createSortedFileList;  // NodeModule.createSortedFileList(pakcageData:Object, tree:Object):Object

NodeModule["sortModuleListByDependencyOrder"] = NodeModule_sortModuleListByDependencyOrder; // NodeModule.sortModuleListByDependencyOrder(list:ModuleNameStringArray, tree:Object):ModuleNameStringArray

// --- utility ---
NodeModule["uniqueArray"]           = NodeModule_uniqueArray;           // NodeModule.uniqueArray(source:Array):Object

// --- implements ------------------------------------------
function NodeModule_files(param) { // @arg Object - { dir, ignore, develop, packageFiles }
                                   // @param.dir PathString = ""         - search path.
                                   // @param.ignore ModuleNameArray = [] - ["uupaa.watch.js", ...]
                                   // @param.develop Boolean = false     - true is search develop information.
                                   // @param.packageFiles Object = null  - package.json files for debug.
                                   // @ret Object - { all, node, worker, browser, label }
                                   // @return.all RelativeFilePathArray     - all
                                   // @return.node RelativeFilePathArray    - for Node.js
                                   // @return.worker RelativeFilePathArray  - for WebWorker
                                   // @return.browser RelativeFilePathArray - for Browser
                                   // @return.label PathStringArray         - label.
    param = param || {};

    var data  = NodeModule_collectPackageData(param); // { json, tree, list }
                NodeModule_removeDevToolModules(data);
    var tree  = NodeModule_resolveDependencyTree(data);
    var files = NodeModule_createSortedFileList(data, param["develop"] ? tree["develop"]
                                                                       : tree["release"]);
//console.log("\u001b[31m" + "data: " + JSON.stringify(data, null, 2));
//console.log("\u001b[33m" + "tree: " + JSON.stringify(tree, null, 2));
//console.log("\u001b[32m" + "files: " + JSON.stringify(files, null, 2) + "\u001b[0m");

    return files; // { all, node, worker, browser }
}

function NodeModule_loadPackageJSON(file,           // @arg PathString    - package.json file path.
                                    packageFiles) { // @arg Object = null - { package.json: JSON, ... }
                                                    // @ret Object|null   - package.json object
    if (packageFiles) {
        if (file in packageFiles) { // is cached package.json?
            return packageFiles[file];
        }
    }

    if ( !fs["existsSync"](file) ) {
        return null;
    }
    return JSON.parse( fs["readFileSync"](file) );
}

function NodeModule_validatePackageJSON(file,  // @arg PathString     - package.json file path.
                                        pkg) { // @arg Object         - package.json object.
                                               // @ret TypeError|null - null is success
// package.json:
//  {
//      "name": "package.name",
//      "x-build": {
//          "source": [],
//          "target": [],
//          "labels": [],
//          "module": {
//              "develop": ["uupaa.valid.js"],
//              "release": []
//          }
//      },
//      "dependencies": {
//      },
//      "devDependencies": {
//          "uupaa.valid.js"
//      }
//  }

    var name = pkg["name"];
    if ( !name || typeof name !== "string") {
        return _formatError(file, "name");
    }

    var build = pkg["x-build"] || pkg["build"];
    if ( !build || !_isObject(build) ) {
        return _formatError(file, "build");
    }

    var source = build["source"];
    if ( !source || !Array.isArray(source) ) {
        return _formatError(file, "x-build.source");
    }

    var target = build["target"];
    if ( !target || !Array.isArray(target) ) {
        return _formatError(file, "x-build.target");
    }

    var label = build["label"] || build["labels"];
    if ( !label || !Array.isArray(label) ) {
        _formatWarning(file, "x-build.label");
    }
    if ("labels" in build) {
        console.warn("Warning: " + file + ", Should rename of x-build.labels to x-build.label");
    }

    var module = build["module"]; // { develop: [], release: [] }
    if ( !module || !_isObject(module) ) {
        return _formatError(file, "x-build.module");
    }

    var module_develop = module["develop"];
    if ( !module_develop || !Array.isArray(module_develop) ) {
        return _formatError(file, "x-build.module.develop");
    }

    var module_release = module["release"];
    if ( !module_release || !Array.isArray(module_release) ) {
        return _formatError(file, "x-build.module.release");
    }

    var dependencies = pkg["dependencies"];
    if ( !dependencies || !_isObject(dependencies) ) {
        return _formatError(file, "dependencies");
    }

    var devDependencies = pkg["devDependencies"];
    if ( !devDependencies || !_isObject(devDependencies) ) {
        return _formatError(file, "devDependencies");
    }

    var packageModules = [].concat(dependencies, devDependencies);
    var has = module_develop.every(function(devlop) {
                return packageModules.indexOf(devlop);
            });

    if (!has) {
        return _formatError(file, "x-build.module.develop");
    }
    has = module_release.every(function(devlop) {
                return packageModules.indexOf(devlop);
            });
    if (!has) {
        return _formatError(file, "x-build.module.release");
    }

    return null;

    function _isObject(source) {
        return source["constructor"] === ({})["constructor"];
    }

    function _formatError(file, hint) {
        return new TypeError("Error: " + file + ", does not conform to the format of WebModule. hint: " + hint);
    }
    function _formatWarning(file, hint) {
        console.warn("Warning: " + file + ", " + hint + " not found");
    }
}

function NodeModule_collectPackageData(param) { // @arg Object - { dir, ignore, develop, packageFiles }
                                                // @param.dir PathString = ""         - search path.
                                                // @param.ignore ModuleNameArray = [] - ["uupaa.watch.js", ...]
                                                // @param.develop Boolean = false     - true is search develop information.
                                                // @param.packageFiles Object = null  - package.json files for debug.
                                                // @ret Object - PackageObject: package.json data. { json, tree, list }
    var dir     = param["dir"]     || "";
    var ignore  = param["ignore"]  || [];
    var develop = param["develop"] || false;
    var packageFiles = param["packageFiles"] || null;

    var json = {};
    var tree = {};
    var list = [];

    var rootDirLength = dir.length;

    _collect(dir, develop, json, tree);

    return {
        "json": json,
        "tree": tree,
        "list": _removePhantomModule(list, json)
    };

    function _collect(dir, develop, json, tree) {
        var file = dir + "package.json";
        var pkg = NodeModule_loadPackageJSON(file, packageFiles);

        if (!pkg) {
            return;
        }

        var formatError = NodeModule_validatePackageJSON(file, pkg);

        if (formatError) {
            throw formatError;
        }

        _collectJSON(json, develop, pkg, dir, rootDirLength);

        if (develop) {
            Object.keys(pkg["devDependencies"]).forEach(_next);
        }
        Object.keys(pkg["dependencies"]).forEach(_next);

        function _next(name) {
            if (ignore.indexOf(name) < 0) {
                if (list.indexOf(name) < 0) {
                    list.push(name);
                }
                tree[name] = {};
                _collect(dir + "node_modules/" + name + "/", develop, json, tree[name]);
            }
        }
    }
}

function _collectJSON(json,            // @arg Object
                      develop,         // @arg Boolean
                      pkg,             // @arg JSON - package.json object.
                      dir,             // @arg PathString
                      rootDirLength) { // @arg Integer - dir.length
    // --- pickup package.json data ---
    var name   = pkg["name"];
    var build  = pkg["x-build"] || pkg["build"];
    var source = build["source"] ||
                 build["files"]; // [DEPRECATED]
    var target = build["target"].join(" ");
    var module = build["module"]; // { develop: [], release: [] }
    var label  = build["label"] || build["labels"] || [];
    var developModule = module["develop"];
    var releaseModule = module["release"];
    var dependencies = pkg["dependencies"];
    var devDependencies = pkg["devDependencies"];

    // --- expand module file path ---
    //      file = (dir + file).slice(rootDirectoryLength);
    source = source.map(function(file) {
                return (dir + file).slice(rootDirLength);
            });

    // --- stock module build setting ---
    if ( !(name in json) ||                                  // found new module -> stock
         json[name]["source"][0].length > source[0].length ) { // more short -> overwrite

        json[name] = {
            "source": source,
            "target": target,
            "label":  label,
            "developModule": developModule,
            "releaseModule": releaseModule,
            "dependencies": dependencies,
            "devDependencies": devDependencies
        };

        if (develop) { // --- merge module ---
            // developModule = unique(merge(developModule, releaseModule))
            if (developModule.length && releaseModule.length) {
                json[name]["developModule"] = NodeModule_uniqueArray( developModule.concat(releaseModule) ).unique;
            }
        }
    }
}

function _removePhantomModule(moduleList, // @arg ModuleNameArray - [name, ...]
                              json) {     // @arg Object          - packageData
                                          // @ret ModuleNameArray
                                          // @desc Remove a module that does not exist.
    return moduleList.reduce(function(result, module) {
                if (module in json) {
                    result.push(module);
                    return result;
                }
                return result;
            }, []);
}

function NodeModule_removeDevToolModules(packageData) { // @arg Object - NodeModule.collectPackageData() result value
                                                        // @ret Object - packageData
    packageData["list"] = packageData["list"].reduce(function(result, name) {
                if (!packageData["json"][name]["target"].length) {
                    return result;
                }
                result.push(name);
                return result;
            }, []);

    return packageData;
}

function NodeModule_resolveDependencyTree(packageData) { // @arg Object - NodeModule.collectPackageData() result value
                                                         // @ret Object - { develop, relase }
                                                         // @packageData.develop Object - develop build dependency object tree.
                                                         // @packageData.release Object - release build dependency object tree.
                                                         // @desc resolve module tree by dependency order
    var json = packageData["json"];
    var tree = packageData["tree"];
    var dependencyData = { "develop": {}, "release": {} };

    ["develop", "release"].forEach(function(type) {
        for (var name in tree) {
            dependencyData[type][name] = {};
            _next(name, tree[name], dependencyData[type][name], type);
        }
    });
    return dependencyData;

    function _next(name, tree, dependencyData, type) {
        if (name in json) {
            var buildModuleNames = json[name][type + "Module"]; // developModule, releaseModule

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

function NodeModule_createSortedFileList(packageData, // @arg Object - NodeModule.data() result value
                                         tree) {      // @arg Object - NodeModule.dependency() result value.
                                                      // @ret Object - { all, node, worker, browser, label }
                                                      // @return.all PathStringArray     - all files.
                                                      // @return.node PathStringArray    - Node.js files.
                                                      // @return.worker PathStringArray  - Worker files.
                                                      // @return.browser PathStringArray - Browser files.
                                                      // @return.label PathStringArray   - label.
    var json = packageData["json"];
    var list = NodeModule_sortModuleListByDependencyOrder(packageData["list"], tree);

    var all = [];
    var node = [];
    var worker = [];
    var browser = [];
    var label = [];

    list.forEach(function(name) {
        if (name in json) {
            var target    = json[name]["target"]; // ["all", "browser", "worker", "node"]
            var toNode    = /(all|node)/i.test(target);
            var toWorker  = /(all|worker)/i.test(target);
            var toBrowser = /(all|browser)/i.test(target);

            Array.prototype.push.apply(label, json[name]["label"]);

            json[name]["source"].forEach(function(file) {
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

    label = label.reduce(function(result, label) {
                    if (result.indexOf(label) < 0) {
                        result.push(label);
                    }
                    return result;
                }, []);

    return {
        "all":      all,
        "node":     node,
        "worker":   worker,
        "browser":  browser,
        "label":    label
    };
}

function NodeModule_sortModuleListByDependencyOrder(list,   // @arg ModuleNameStringArray - [moduleName, ...]
                                                    tree) { // @arg Object - module dependency tree. { moduleName: { subModuleName, ... }, ... }
                                                            // @ret ModuleNameStringArray - sorted new array.
//  console.log("list: " + JSON.stringify(list, null, 2));
//  console.log("tree: " + JSON.stringify(tree, null, 2));

    return list.slice().sort(_sortFunction); // clone and sort

    function _sortFunction(moduleA,   // @arg ModuleNameString: module A
                           moduleB) { // @arg ModuleNameString: module B
                                      // @ret Integer: -1, 0, +1
      //console.log(moduleA, "と", moduleB, "を比較します");

        if (moduleA in tree) {
            if (_isDependency(tree, tree[moduleA], moduleA, moduleB)) {
              //console.log(moduleA, "は", moduleB, "に依存しています(先に読み込みが必要です)");
                return 1;  // [moduleA, moduleB].sort() -> [moduleB, moduleA]
            }
        }

        if (moduleB in tree) {
            if (_isDependency(tree, tree[moduleB], moduleB, moduleA)) {
              //console.log(moduleB, "は", moduleA, "に依存しています(先に読み込みが必要です)");
                return -1; // [moduleB, moduleA].sort() -> [moduleA, moduleB]
            }
        }

      //console.log(moduleA, "と", moduleB, "に依存関係はありません");
      //debugger;

      //return 0; // stay position.
        // --- [!] ---
        // Array#sort does not stable sort in IE, Chrome and AS3.
        // `return 0` becomes the bug(is not interoperability)

        if (list.indexOf(moduleA) < list.indexOf(moduleB)) { // [!] sort original list order.
            return -1;
        }
        return 1;
    }

    function _isDependency(rootTree,    // @arg Object  - module dependency tree.
                           currentTree, // @arg Object  - module dependency sub tree.
                           moduleA,     // @arg String  - current module. "uupaa.nodemodule.js"
                           moduleB) {   // @arg String  - find target module. "uupaa.base64.js"
                                        // @ret Boolean - Module A is dependent on the module B.
                                        // @recursive
        if (moduleB in currentTree) {
            return true;
        }

        for (var name in currentTree) {

            if (name !== moduleA) {
                if (_isDependency(rootTree, currentTree[name], moduleA, moduleB)) { // find sub tree
                    return true;
                }
                if (name in rootTree) {
                    if (_isDependency(rootTree, rootTree[name], moduleA, moduleB)) { // find root tree
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

function NodeModule_uniqueArray(source) { // @arg Array
                                          // @ret Object - { unique:Array, dup:Array }
    var unique = [], dup = [], i = 0, iz = source.length;

    for (; i < iz; ++i) {
        if (unique.indexOf(source[i]) >= 0) {
            dup.push(source[i]);
        } else {
            unique.push(source[i]);
        }
    }
    return { unique: unique, dup: dup };
}

// --- validate / assertions -------------------------------
//{@dev
//function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
//function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = NodeModule;
}
global["NodeModule" in global ? "NodeModule_" : "NodeModule"] = NodeModule; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

