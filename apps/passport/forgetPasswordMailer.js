//var sendgrid = require('sendgrid')('vogueandverge', process.env.SENDGRID_API_KEY);

module.exports = function send(user) {

    var resetUrl = process.env.DOMAIN + '/auth/password-token-reset' + '?token=' + user.get({role: 'self'}).passwordResetToken;

    var html  = '<img src="' + process.env.DOMAIN + '/img/cahootLogo.jpg" style="max-width: 100%; padding: 20px; box-sizing: border-box;">';
        html += '<h3>Hi there!</h3>';
        html += '<p>You have requested for a password reset. In order to reset your password please follow this <a href="' + resetUrl + '">link</a>.</p>';
        html += '<p>You have 12 hours before the request expires. If you did not request for the change, please ignore this mail.</p>';
  
    //sendgrid.send({
    //  to:       user.get({role: 'self'}).email,
    //  from:     'info@thecahoot.com',
    //  fromname: 'Cahoot',
    //  subject:  'Cahoot password reset.',
    //  html:     html
    //}, function(err, json){
    //  if (err) { console.log(err.stack); }
    //  return json;
    //});

};