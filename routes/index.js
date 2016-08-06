var express = require('express');
var router = express.Router();


  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  router.get('/', function(req, res) {
    res.render('home',{
         // "name": "Jake"
      });
  });

router.get('/admin-test', function(req, res) {
    res.render('admin',{
        // "name": "Jake"
    }); // load the index.ejs file
});
  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  router.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup', { message: 'Hey something is wrong!' });
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

module.exports = router;