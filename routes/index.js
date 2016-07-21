var express = require('express');
var router = express.Router();


  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  router.get('/', function(req, res) {
    res.render('index', {partials: {}}); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  router.get('/login', function(req, res) {
    res.locals = {message: req.flash('loginMessage') };
    // render the page and pass in any flash data if it exists
    res.render('login', { partials: {}});

  });

  // process the login form
  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/admin', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  router.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup', { message: req.flash('signupMessage') });
  });

  // process the signup form
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/admin', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // =====================================
  // LOGOUT ==============================
  // =====================================
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


module.exports = router;