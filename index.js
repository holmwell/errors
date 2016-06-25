// @holmwell/errors
//
// A basic error manager for Express projects. Logs
// to the console. 
//
module.exports = function () {

    var logError = function (err) {
        console.log(err);
        if (err && err.stack) {
            console.log(err.stack);
        }
    };

    var handleError = function (err, res) {
        var message = err.message || "Internal server error";
        var status = err.status || 500;
        
        if (typeof res === "function") {
            // Internal error.
            console.log(err);
            res(err);
        }
        else if (res) {
            // Customer-visible error.
            logError(err);
            res.status(status).send(message);
        }
        else {
            // Internal error, no callback.
            console.log(err);
        }
    };

    // Useful for guarding callbacks. For example,
    // say we have:
    //
    // db.circles.getAll(function (err, circles) {
    //     if (err) {
    //         handleError(err, res);
    //     }
    //     <deal with circles>
    // });
    //
    // We can use 'guard' to do this instead:
    // 
    // db.circles.getAll(guard(res, function (circles) {
    //     <deal with circles>
    // }));
    //
    var guard = function (res, callback) {
        var fn = function (err, data) {
            if (err) {
                return handleError(err, res);
            }
            callback(data);
        };
        return fn;
    };

    var middleware = function (err, req, res, next) {
        if (err) {
            return handleError(err, res);
        }
        // TODO: Should not get here. Panic.
        next();
    };

    return {
        log: logError,
        handle: handleError,
        guard: guard,
        middleware: middleware
    };
}();