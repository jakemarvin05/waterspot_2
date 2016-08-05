var express = require('express');
var router = express.Router();


  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  router.get('/', function(req, res) {
<<<<<<< HEAD
    res.locals = { title : 'Home' };
    res.render('home',{
         // "name": "Jake"
      }); // load the index.ejs file
  });

router.get('/admin-test', function(req, res) {
    res.render('admin',{
        // "name": "Jake"
    }); // load the index.ejs file
});

=======
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
>>>>>>> 9d0b864c079c904e99f8350ccacb1cacecbf971f

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  router.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
<<<<<<< HEAD
    res.render('signup', { message: 'Hey something is wrong!' });
=======
    res.render('signup', { message: req.flash('signupMessage') });
>>>>>>> 9d0b864c079c904e99f8350ccacb1cacecbf971f
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

<<<<<<< HEAD
  router.get('/api/users', function(req, res){
    res.send(
        {user:{
          id:2,
          name:'Jake Marvin Alim',
          age: 22,
          gender: 'male'
        }}
    );
  });
=======
>>>>>>> 9d0b864c079c904e99f8350ccacb1cacecbf971f

module.exports = router;