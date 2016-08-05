var express = require('express');
var router = express.Router();


// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', function(req, res) {
    //res.locals = {message: req.flash('loginMessage') };
    // render the page and pass in any flash data if it exists
    var __debug = DEBUG('adaro');
    __debug('rendering...');
    res.render('login');
});


// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/admin', // redirect to the secure profile section
    failureRedirect : '/logout', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// =====================================
// ADMIN PAGE (with login links) ========
// =====================================
router.get('/',CHECK_AUTH, function(req, res) {
    res.render('admin'); // load the index.ejs file
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
