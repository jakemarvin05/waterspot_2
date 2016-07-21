/* THIS IS DEPRECATED  and replaced by checkAuth.js */

'use strict';

function noAuth(req, res, msg) {
    if (req.isAuthenticated()) { return false; }
    var msg = msg || 'Not authorised';
    res.status(403).send(msg);
    return true;
}
module.exports = noAuth;