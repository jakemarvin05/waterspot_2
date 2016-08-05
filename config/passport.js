/**
 * Created by techticsninja on 7/20/16.
 */
'use strict';

var LocalStrategy = require('passport-local').Strategy;
var encrypter = require('../apps/passport/encrypter');
var debug = DEBUG('passport');
var validator = require('validator');
//var welcomeMailer = require('../apps/passport/welcomeMailer');



// expose this function to our app using module.exports
function Passport (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    //used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        debug('Serialising user.');
        done(null, user.userId);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        debug('Deserialising user.');
        DB.User.findOne({
            where: {userId: id}
        }).then(function(user) {
            done(null, user);
        }).catch(function(err) {
            done(err, null);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, email, password, done) {

        debug('Local signup.');
        debug(email);

        var email = req.body.email.toLowerCase();
        var password = req.body.password;
        var generator = encrypter.generateHash(password);

        // password >= 5 characters.
        if (typeof password !== 'string' || password.length < 5) {
            return done(null, false, req.flash('signupMessage', 'The password is too short.'));

        }

        debug('before create');
        DB.User
            .findOrCreate({
                where: {
                    loginType: 'email',
                    email: email
                },
                defaults: {
                    password: generator.hash,
                    salt: generator.salt,
                    email: email,
                    name: _getEmailUsername(email)
                }
            }).spread(function(user, created) {
            //  debug(created);
            debug('spread');
            if (!created) {
                debug('Email already exist.');
                return done(null, false, req.flash('signupMessage', 'Email is already registered.'));
            }

            return done(null, user);
            // send welcome email
            // welcomeMailer(user.get({role: 'admin'}));

        }).catch(function(err){
            debug(err);
            return done(null, false, req.flash('signupMessage', 'An Error occurred.'));
        });


        // =========================================================================
        // LOCAL LOGIN =============================================================
        // =========================================================================

        passport.use('local-login', new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, email, password, done) { // callback with email and password from our form
                //var email = req.body.email = username;
                //check if email and password are valid strings.

                console.log('@jake');

                if(typeof email !== 'string' || typeof password !== 'string') {
                    return res.status(400).send({
                        success: false,
                        message: 'Email or Password is not valid.',
                        hideMessage: false
                    });
                }

                //basic email check.
                if(!validator.isEmail(email)) {
                    return res.status(400).send({
                        success: false,
                        message: 'Email is not valid.',
                        hideMessage: false
                    });
                }

                process.nextTick(function() {
                    debug('Local-login');
                    debug(email);
                    debug(password);
                    debug(done);


                    var email = req.body.email.toLowerCase();

                    DB.User.find({
                        where: {
                            loginType: 'email',
                            email: email
                        }
                    }).then(function(user) {
                        debug('User:', user);

                        if (!user || !user.authenticate(req.body.password)) throw {name: 'authenticationFailed'};

                        return done(null, user.get({role: 'self'}))

                    }).catch(function(err) {
                        // custom errors.
                        if(typeof err === 'object') {
                            if(err.name) {
                                if(err.name === 'authenticationFailed') return done({ code: 403 }, null)
                            }
                        }

                        done({ code: 500 }, false, err);
                    });
                });

            })); // closure: passport.use 'local'

        function _getEmailUsername(email) {
            if (typeof email !== 'string') return '';

            var i = email.indexOf('@');

            if (i === -1) return '';

            return email.substring(0, i);
        }

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            //var email = req.body.email = username;
            //check if email and password are valid strings.

            if(typeof email !== 'string' || typeof password !== 'string') {
                return res.status(400).send({
                    success: false,
                    message: 'Email or Password is not valid.',
                    hideMessage: false
                });
            }

            //basic email check.
            if(!validator.isEmail(email)) {
                return res.status(400).send({
                    success: false,
                    message: 'Email is not valid.',
                    hideMessage: false
                });
            }

            process.nextTick(function() {
                debug('Local-login');
                debug(email);
                debug(password);
                debug(done);


                var email = req.body.email.toLowerCase();

                DB.User.find({
                    where: {
                        loginType: 'email',
                        email: email
                    }
                }).then(function(user) {

                    if (!user || !user.authenticate(req.body.password)) throw {name: 'authenticationFailed'};
                    return done(null, user)

                }).catch(function(err) {
                    // custom errors.
                    if(typeof err === 'object') {
                        if(err.name) {
                            if(err.name === 'authenticationFailed') return done({ code: 403 }, null)
                        }
                    }

                    done({ code: 500 }, false, err);
                });
            });

        })); // closure: passport.use 'local'

} // closure Passport

module.exports = Passport;