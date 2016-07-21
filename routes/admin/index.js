var express = require('express');
var router = express.Router();


// =====================================
// ADMIN PAGE (with login links) ========
// =====================================
router.get('/',CHECK_AUTH, function(req, res) {
    res.render('dashboard', {layout:'admin', partials: {}}); // load the index.ejs file
});


// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile',CHECK_AUTH, function(req, res) {
    res.locals = {user: req.user.dataValues};
    res.render('profile', {partials: {}});
});


module.exports = router;
