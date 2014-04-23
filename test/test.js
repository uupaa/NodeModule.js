new Test().add([
        testNodeModule_load,
    ]).run(function(err, test) {
        if (1) {
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

function testNodeModule_load(next) {

    var result = NodeModule.load({ develop: true });

//  console.log( JSON.stringify(result, null, 2) );

    if (result.nodeFiles.join(",").indexOf("uupaa.valid.js") >= 0) {
        console.log("testNodeModule_load ok");
        next && next.pass();
    } else {
        console.error("testNodeModule_load ng");
        next && next.miss();
    }
}

