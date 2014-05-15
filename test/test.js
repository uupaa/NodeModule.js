var ModuleTestNodeModule = (function(global) {

// --- test data -----------------------------------------------------
var PackageHMAC = {
                  "name":           "uupaa.hmac.js",
                  "version":        "0.8.21",
                  "x-build": {
                    "files":        ["lib/HMAC.js"],
                    "output":       "release/HMAC.min.js",
                    "target":       ["all"],
                    "labels":       [],
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
                    "files": [ "lib/ByteArray.js" ],
                    "output": "release/ByteArray.min.js",
                    "target": [ "all" ],
                    "labels": [],
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
                    "files": [ "lib/Console.js" ],
                    "output": "release/Console.min.js",
                    "target": [ "Worker" ],
                    "labels": [],
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
                    "files": [ "lib/Help.js" ],
                    "output": "release/Help.min.js",
                    "target": [ "Browser" ],
                    "labels": [],
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
                    "files": [ "lib/MD5.js" ],
                    "output": "release/MD5.min.js",
                    "target": [ "all" ],
                    "labels": [],
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
                    "files": [ "lib/Minify.js" ],
                    "output": "release/Minify.min.js",
                    "target": [],
                    "labels": [],
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
                    "files": [ "lib/NodeModule.js" ],
                    "output": "release/NodeModule.min.js",
                    "target": [ "Node" ],
                    "labels": [],
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
                    "files": [ "lib/Plato.js" ],
                    "output": "release/Plato.min.js",
                    "target": [],
                    "labels": [],
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
                    "files": [ "lib/SHA1.js" ],
                    "output": "release/SHA1.min.js",
                    "target": [ "all" ],
                    "labels": [],
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
                    "files": [ "lib/Task.js" ],
                    "output": "release/Task.min.js",
                    "target": [ "all" ],
                    "labels": [],
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
                    "files": [ "lib/Test.js" ],
                    "output": "release/Test.min.js",
                    "target": [ "all" ],
                    "labels": [],
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
                    "files": [ "lib/Valid.js" ],
                    "output": "release/Valid.min.js",
                    "target": [ "all" ],
                    "labels": [],
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
                    "files": [ "lib/Watch.js" ],
                    "output": "release/Watch.min.js",
                    "target": [],
                    "labels": [],
                    "module": {
                      "develop": [],
                      "release": []
                    }
                  },
                  "dependencies": {},
                  "devDependencies": {},
                };

// --------------------------------------------------------------------------

return new Test("NodeModule", {
        disable:    false,
        browser:    false,
        worker:     false,
        node:       true,
        button:     true,
        both:       true,
    }).add([
        testNodeModule_files,
    ]).run().clone();

// --------------------------------------------------------------------------

function testNodeModule_files(next) {
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
      "labels": []
    };

    var param = { develop: true, packageFiles: packageFiles };
    var files = NodeModule.files(param);

    //console.log( "result: " + JSON.stringify(result, null, 2) );
    //console.log( "files: " + JSON.stringify(files, null, 2) );

    if ( JSON.stringify(result) === JSON.stringify(files) ) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}


})((this || 0).self || global);

