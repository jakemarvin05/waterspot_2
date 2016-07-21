'use strict';
var debug = global.DEBUG('passport');

/*
checkAuth can be used by both router.all like this:

        router.all('*', checkAuth);

    It calls next() if passed. terminates req by sending a response if failed.

Or used inside of a router without passing in `next` to return boolean like this:

        checkAuth(req);

    It returns true when passed. Returns false if failed.
*/ 

function checkAuth(req, res, next) {
    if (req) {
        if (req.headers) { debug(JSON.stringify(req.headers)); }
        else { debug('request has no headers!'); }
    }

    var isUsedInsideRoute = next ? false : true;

    debug('isUsedInsideRoute: ' + isUsedInsideRoute + '. Checking auth...');
    debug('Authorisation: ' + req.isAuthenticated());
    debug('User: ' + req.user);

    if (req.isAuthenticated()) { 
        debug('Auth is good.');
        // return bool
        if (isUsedInsideRoute) return true;

        
        // call next() when not used inside a route.
        return next(); 
    }

    debug('Auth is bad.');

    // handle response for both scenario.
    // DEPRECATED!
    //if (res) return res.status(403).send('Not authorised');
    res.redirect('/login');
    return false;
}

module.exports = checkAuth;