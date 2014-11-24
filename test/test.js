var ModuleTestNodeModule = (function(global) {

// --- test data -----------------------------------------------------
var PackageHMAC = {
                  "name":           "uupaa.hmac.js",
                  "version":        "0.8.21",
                  "x-build": {
                    "source":       ["lib/HMAC.js"],
                    "output":       "release/HMAC.min.js",
                    "target":       ["all"],
                    "label":       [],
                    "module": {
                      "develop":    ["uupaa.valid.js"],
                      "release":    ["uupaa.bytearray.js"]
                    }
                  },
                  "dependencies": {
                    "uupaa.bytearray.js": ""
                  },
                  "devDependencies": {
                    "uupaa.nodemodule.js": "",
                    "uupaa.console.js": "",
                    "uupaa.valid.js":   "",
                    "uupaa.help.js":    "",
                    "uupaa.task.js":    "",
                    "uupaa.test.js":    "",
                    "uupaa.watch.js":   "",
                    "uupaa.plato.js":   "",
                    "uupaa.minify.js":  "",
                    "uupaa.sha1.js":    "",
                    "uupaa.md5.js":     ""
                  }
                };

var PackageByteArray = {
                  "name": "uupaa.bytearray.js",
                  "version": "0.9.5",
                  "x-build": {
                    "source": [ "lib/ByteArray.js" ],
                    "output": "release/ByteArray.min.js",
                    "target": [ "all" ],
                    "label": [],
                    "module": {
                      "develop": [ "uupaa.valid.js" ],
                      "release": []
                    }
                  },
                  "dependencies": {},
                  "devDependencies": {
                    "uupaa.nodemodule.js": "",
                    "uupaa.console.js": "",
                    "uupaa.valid.js": "",
                    "uupaa.help.js": "",
                    "uupaa.task.js": "",
                    "uupaa.test.js": "",
                    "uupaa.watch.js": "",
                    "uupaa.plato.js": "",
                    "uupaa.minify.js": ""
                  }
                };

var PackageConsole = {
                  "name": "uupaa.console.js",
                  "version": "0.8.7",
                  "x-build": {
                    "source": [ "lib/Console.js" ],
                    "output": "release/Console.min.js",
                    "target": [ "Worker" ],
                    "label": [],
                    "module": {
                      "develop": [],
                      "release": []
                    }
                  },
                  "dependencies": {},
                  "devDependencies": {
                    "uupaa.nodemodule.js": "",
                    "uupaa.help.js": "",
                    "uupaa.task.js": "",
                    "uupaa.test.js": "",
                    "uupaa.watch.js": "",
                    "uupaa.plato.js": "",
                    "uupaa.minify.js": ""
                  }
                };

var PackageHelp = {
                  "name": "uupaa.help.js",
                  "version": "0.8.25",
                  "x-build": {
                    "source": [ "lib/Help.js" ],
                    "output": "release/Help.min.js",
                    "target": [ "Browser" ],
                    "label": [],
                    "module": {
                      "develop": [],
                      "release": []
                    }
                  },
                  "dependencies": {},
                  "devDependencies": {
                    "uupaa.nodemodule.js": "",
                    "uupaa.console.js": "",
                    "uupaa.valid.js": "",
                    "uupaa.task.js": "",
                    "uupaa.test.js": "",
                    "uupaa.watch.js": "",
                    "uupaa.plato.js": "",
                    "uupaa.minify.js": ""
                  }
                };

var PackageMD5 = {
                  "name": "uupaa.md5.js",
                  "version": "0.8.19",
                  "x-build": {
                    "source": [ "lib/MD5.js" ],
                    "output": "release/MD5.min.js",
                    "target": [ "all" ],
                    "label": [],
                    "module": {
                      "develop": [ "uupaa.valid.js" ],
                      "release": [ "uupaa.bytearray.js" ]
                    }
                  },
                  "dependencies": {
                    "uupaa.bytearray.js": ""
                  },
                  "devDependencies": {
                    "uupaa.nodemodule.js": "",
                    "uupaa.console.js": "",
                    "uupaa.valid.js": "",
                    "uupaa.help.js": "",
                    "uupaa.task.js": "",
                    "uupaa.test.js": "",
                    "uupaa.watch.js": "",
                    "uupaa.plato.js": "",
                    "uupaa.minify.js": ""
                  }
                };

var PackageMinify = {
                  "name": "uupaa.minify.js",
                  "version": "0.10.8",
                  "x-build": {
                    "source": [ "lib/Minify.js" ],
                    "output": "release/Minify.min.js",
                    "target": [],
                    "label": [],
                    "module": {
                      "develop": [],
                      "release": []
                    }
                  },
                  "dependencies": {},
                  "devDependencies": {
                    "uupaa.nodemodule.js": ""
                  }
                };

var PackageNodeModule = {
                  "name": "uupaa.nodemodule.js",
                  "version": "0.6.12",
                  "x-build": {
                    "source": [ "lib/NodeModule.js" ],
                    "output": "release/NodeModule.min.js",
                    "target": [ "Node" ],
                    "label": [],
                    "module": {
                      "develop": [],
                      "release": []
                    }
                  },
                  "dependencies": {},
                  "devDependencies": {
                    "uupaa.console.js": "",
                    "uupaa.valid.js": "",
                    "uupaa.help.js": "",
                    "uupaa.task.js": "",
                    "uupaa.test.js": "",
                    "uupaa.watch.js": "",
                    "uupaa.plato.js": "",
                    "uupaa.minify.js": ""
                  }
                };

var PackagePlato = {
                  "name": "uupaa.plato.js",
                  "version": "0.8.13",
                  "x-build": {
                    "source": [ "lib/Plato.js" ],
                    "output": "release/Plato.min.js",
                    "target": [],
                    "label": [],
                    "module": {
                      "develop": [],
                      "release": []
                    }
                  },
                  "dependencies": {},
                  "devDependencies": {}
                };

var PackageSHA1 = {
                  "name": "uupaa.sha1.js",
                  "version": "0.8.13",
                  "x-build": {
                    "source": [ "lib/SHA1.js" ],
                    "output": "release/SHA1.min.js",
                    "target": [ "all" ],
                    "label": [],
                    "module": {
                      "develop": [ "uupaa.valid.js" ],
                      "release": [ "uupaa.bytearray.js" ]
                    }
                  },
                  "dependencies": {
                    "uupaa.bytearray.js": ""
                  },
                  "devDependencies": {
                    "uupaa.nodemodule.js": "",
                    "uupaa.console.js": "",
                    "uupaa.valid.js": "",
                    "uupaa.help.js": "",
                    "uupaa.task.js": "",
                    "uupaa.test.js": "",
                    "uupaa.watch.js": "",
                    "uupaa.plato.js": "",
                    "uupaa.minify.js": ""
                  }
                };

var PackageTask = {
                  "name": "uupaa.task.js",
                  "version": "0.8.33",
                  "x-build": {
                    "source": [ "lib/Task.js" ],
                    "output": "release/Task.min.js",
                    "target": [ "all" ],
                    "label": [],
                    "module": {
                      "develop": [ "uupaa.valid.js" ],
                      "release": []
                    }
                  },
                  "dependencies": {},
                  "devDependencies": {
                    "uupaa.nodemodule.js": "",
                    "uupaa.console.js": "",
                    "uupaa.valid.js": "",
                    "uupaa.help.js": "",
                    "uupaa.test.js": "",
                    "uupaa.watch.js": "",
                    "uupaa.plato.js": "",
                    "uupaa.minify.js": ""
                  }
                };

var PackageTest = {
                  "name": "uupaa.test.js",
                  "version": "0.10.11",
                  "x-build": {
                    "source": [ "lib/Test.js" ],
                    "output": "release/Test.min.js",
                    "target": [ "all" ],
                    "label": [],
                    "module": {
                      "develop": [ "uupaa.valid.js", "uupaa.task.js" ],
                      "release": [ "uupaa.task.js" ]
                    }
                  },
                  "dependencies": {
                    "uupaa.task.js": ""
                  },
                  "devDependencies": {
                    "uupaa.nodemodule.js": "",
                    "uupaa.console.js": "",
                    "uupaa.valid.js": "",
                    "uupaa.help.js": "",
                    "uupaa.watch.js": "",
                    "uupaa.plato.js": "",
                    "uupaa.minify.js": ""
                  }
                };

var PackageValid = {
                  "name": "uupaa.valid.js",
                  "version": "0.8.12",
                  "x-build": {
                    "source": [ "lib/Valid.js" ],
                    "output": "release/Valid.min.js",
                    "target": [ "all" ],
                    "label": [],
                    "module": {
                      "develop": [],
                      "release": []
                    }
                  },
                  "dependencies": {},
                  "devDependencies": {
                    "uupaa.nodemodule.js": "",
                    "uupaa.console.js": "",
                    "uupaa.help.js": "",
                    "uupaa.task.js": "",
                    "uupaa.test.js": "",
                    "uupaa.watch.js": "",
                    "uupaa.plato.js": "",
                    "uupaa.minify.js": ""
                  }
                };

var PackageWatch = {
                  "name": "uupaa.watch.js",
                  "version": "0.8.13",
                  "x-build": {
                    "source": [ "lib/Watch.js" ],
                    "output": "release/Watch.min.js",
                    "target": [],
                    "label": [],
                    "module": {
                      "develop": [],
                      "release": []
                    }
                  },
                  "dependencies": {},
                  "devDependencies": {},
                };

var PackageReflection = {
                  "name":           "uupaa.reflection.js",
                  "version":        "0.0.17",
                  "x-build": {
                    "source":       ["lib/Reflection.js"],
                    "output":       "release/Reflection.min.js",
                    "target":       ["all"],
                    "label":        ["@dev"],
                    "module": {
                      "develop":    [],
                      "release":    []
                    }
                  },
                  "dependencies": {},
                  "devDependencies": {
                    "uupaa.nodemodule.js": "",
                    "uupaa.console.js": "",
                    "uupaa.valid.js":   "",
                    "uupaa.help.js":    "",
                    "uupaa.task.js":    "",
                    "uupaa.test.js":    "",
                    "uupaa.watch.js":   "",
                    "uupaa.plato.js":   "",
                    "uupaa.minify.js":  ""
                  }
                };

// --------------------------------------------------------------------------

return new Test("NodeModule", {
        disable:    false,
        browser:    false,
        worker:     false,
        node:       true,
        button:     false,
        both:       false,
    }).add([
//        testNodeModule_files,
        testNodeModule_sortModuleListByDependencyOrder,
    ]).run().clone();

// --------------------------------------------------------------------------

function testNodeModule_files(test, pass, miss) {
    var packageFiles = {};

    packageFiles["package.json"] = PackageHMAC;
    packageFiles["node_modules/uupaa.bytearray.js/package.json"] = PackageByteArray;
    packageFiles["node_modules/uupaa.console.js/package.json"] = PackageConsole;
    packageFiles["node_modules/uupaa.help.js/package.json"] = PackageHelp;
    packageFiles["node_modules/uupaa.md5.js/package.json"] = PackageMD5;
    packageFiles["node_modules/uupaa.md5.js/node_modules/uupaa.bytearray.js/package.json"] = PackageByteArray;
    packageFiles["node_modules/uupaa.minify.js/package.json"] = PackageMinify;
    packageFiles["node_modules/uupaa.nodemodule.js/package.json"] = PackageNodeModule;
    packageFiles["node_modules/uupaa.plato.js/package.json"] = PackagePlato;
    packageFiles["node_modules/uupaa.sha1.js/package.json"] = PackageSHA1;
    packageFiles["node_modules/uupaa.sha1.js/node_modules/uupaa.bytearray.js/package.json"] = PackageByteArray;
    packageFiles["node_modules/uupaa.task.js/package.json"] = PackageTask;
    packageFiles["node_modules/uupaa.test.js/package.json"] = PackageTest;
    packageFiles["node_modules/uupaa.valid.js/package.json"] = PackageValid;
    packageFiles["node_modules/uupaa.watch.js/package.json"] = PackageWatch;
//  packageFiles["node_modules/uupaa.reflection.js/package.json"] = PackageReflection;

    var result = {
      "all": [
        "node_modules/uupaa.nodemodule.js/lib/NodeModule.js",
        "node_modules/uupaa.console.js/lib/Console.js",
        "node_modules/uupaa.valid.js/lib/Valid.js",
        "node_modules/uupaa.help.js/lib/Help.js",
        "node_modules/uupaa.task.js/lib/Task.js",
        "node_modules/uupaa.test.js/lib/Test.js",
        "node_modules/uupaa.bytearray.js/lib/ByteArray.js",
        "node_modules/uupaa.sha1.js/lib/SHA1.js",
        "node_modules/uupaa.md5.js/lib/MD5.js"
      ],
      "node": [
        "node_modules/uupaa.nodemodule.js/lib/NodeModule.js",
        "node_modules/uupaa.valid.js/lib/Valid.js",
        "node_modules/uupaa.task.js/lib/Task.js",
        "node_modules/uupaa.test.js/lib/Test.js",
        "node_modules/uupaa.bytearray.js/lib/ByteArray.js",
        "node_modules/uupaa.sha1.js/lib/SHA1.js",
        "node_modules/uupaa.md5.js/lib/MD5.js"
      ],
      "worker": [
        "node_modules/uupaa.console.js/lib/Console.js",
        "node_modules/uupaa.valid.js/lib/Valid.js",
        "node_modules/uupaa.task.js/lib/Task.js",
        "node_modules/uupaa.test.js/lib/Test.js",
        "node_modules/uupaa.bytearray.js/lib/ByteArray.js",
        "node_modules/uupaa.sha1.js/lib/SHA1.js",
        "node_modules/uupaa.md5.js/lib/MD5.js"
      ],
      "browser": [
        "node_modules/uupaa.valid.js/lib/Valid.js",
        "node_modules/uupaa.help.js/lib/Help.js",
        "node_modules/uupaa.task.js/lib/Task.js",
        "node_modules/uupaa.test.js/lib/Test.js",
        "node_modules/uupaa.bytearray.js/lib/ByteArray.js",
        "node_modules/uupaa.sha1.js/lib/SHA1.js",
        "node_modules/uupaa.md5.js/lib/MD5.js"
      ],
      "label": []
    };

    var param = { develop: true, packageFiles: packageFiles };
    var files = NodeModule.files(param);

    //console.log( "result: " + JSON.stringify(result, null, 2) );
    //console.log( "files: " + JSON.stringify(files, null, 2) );

    if ( JSON.stringify(result) === JSON.stringify(files) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testNodeModule_sortModuleListByDependencyOrder(test, pass, miss) {
    var list = [
      "nodemodule",
      "console",
      "valid",
      "help",
      "task",
      "test",
      "lv3",
      "reflection"
    ];

    var tree = {
      "nodemodule": {},    // 依存関係なし
      "console": {},       // 他のモジュール(help)が参照している
      "valid": {
        "reflection": {},  // [1] reflection が valid より前に必要
        "help": {          // [2] help が valid より前に必要
          "lv3": {         // [8] lv3 が help や valid の前に必要
          }
        }
      },
      "help": {
        "reflection": {},  // [3] reflection が help より前に必要
        "console": {}      // [4] console が help より前に必要
      },
      "task": {
        "valid": {}        // [5] valid が task より前に必要
      },
      "test": {
        "valid": {},       // [6] valid が test より前に必要
        "task": {}         // [7] task が test より前に必要
      },
      "reflection": {},    // 他のモジュール(valid, help)が参照している
    };

    var resultList = [
      "nodemodule",
      "console",            // [4]
      "reflection",         // [1][3]
      "lv3",                // [8]
      "help",               // [2]
      "valid",              // [5][6]
      "task",               // [7]
      "test",
    ];

    console.log("list: ", JSON.stringify(list, null, 2));
    console.log("tree: ", JSON.stringify(tree, null, 2));

    var result = NodeModule.sortModuleListByDependencyOrder(list, tree);
    console.log("result: ", JSON.stringify(result, null, 2));

    if ( result.join() === resultList.join() ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

})((this || 0).self || global);

