new Test().add([
        testNodeModule_collectPackageData,
        testNodeModule_resolveDependencyTree,
        testNodeModule_files,
    ]).run(function(err, test) {
        if (0) {
            err || test.worker(function(err, test) {
                if (!err && typeof NodeModule_ !== "undefined") {
                    var name = Test.swap(NodeModule, NodeModule_);

                    new Test(test).run(function(err, test) {
                        Test.undo(name);
                    });
                }
            });
        }
    });

function testNodeModule_collectPackageData(next) {
    var param = { develop: true, ignore: ["uupaa.watch.js", "uupaa.plato.js", "uupaa.minify.js"] };
    var data  = NodeModule.collectPackageData(param); // { json, tree, list }

    console.log( "data: " + JSON.stringify(data, null, 2) );

    if (1) {
        console.log("testNodeModule_collectPackageData ok");
        next && next.pass();
    } else {
        console.error("testNodeModule_collectPackageData ng");
        next && next.miss();
    }
}

function testNodeModule_resolveDependencyTree(next) {
    var param = { develop: true, ignore: ["uupaa.watch.js", "uupaa.plato.js", "uupaa.minify.js"] };
    var data  = NodeModule.collectPackageData(param); // { json, tree, list }
    var tree  = NodeModule.resolveDependencyTree(data); // { develop, release }

    console.log( "data.tree: " + JSON.stringify(data.tree, null, 2) );
    console.log( "tree.develop: " + JSON.stringify(tree.develop, null, 2) );

    if (1) {
        console.log("testNodeModule_resolveDependencyTree ok");
        next && next.pass();
    } else {
        console.error("testNodeModule_resolveDependencyTree ng");
        next && next.miss();
    }
}

function testNodeModule_files(next) {
    var param = { develop: true, ignore: ["uupaa.watch.js", "uupaa.plato.js", "uupaa.minify.js"] };
    var files = NodeModule.files(param);

    console.log( "files: " + JSON.stringify(files, null, 2) );

    if (1) {
        console.log("testNodeModule_files ok");
        next && next.pass();
    } else {
        console.error("testNodeModule_files ng");
        next && next.miss();
    }
}

