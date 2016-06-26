# errors
Error handling for Node.js and Express

To install:

    npm install @holmwell/errors

To use:

    var errors = require("@holmwell/errors");

### errors.log(Error)

Logs an Error object, or just a string, to the
console. Future versions may log to some 
framework.

### errors.guard(response, function (result))

Used for refactoring all your error conditionals. 
That is, it is for turning code like this:

    db.circles.getAll(function (err, circles) {
        if (err) {
             handleError(err, res);
        }
        // <deal with circles>
    });

Into this:

    db.circles.getAll(guard(res, function (circles) {
        // <deal with circles>
    }));

### errors.handle(Error, response)

Primarily used internally, but you can also use it
to send and an error code back to the Express client.

### errors.middleware

Handle uncaught errors in your Express middleware stack.
Typically this should be put near the end / bottom of
your middleware.

    var app = require('express')();
    // Define routes, app.use(...), etc
    app.use(errors.middleware);


### license

This module is available under a BSD 2-clause license.

### author

Phil Manijak / Holmwell Software