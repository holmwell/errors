# errors
Error handling for Node.js and Express

This is a naive module for error handling that just logs
to the console. Aside from log, the most common function
used is `guard`, which is good for turning code like this:

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

This module is available under a BSD license.