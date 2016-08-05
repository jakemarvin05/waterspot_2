var mailer = require('../mailer.js');

var fname = 'welcomeMailer.js ';

var debug = require('debug')('welcomeMailer');

function welcomeMailer(user) {

    debug('welcomeMailer');
    debug(JSON.stringify(user));

    if (!user) return;
    if (typeof user.email !== 'string' || user.email.length === 0) return;

    debug('welcomeMailer criterii passed.');

    var to = user.email;
    var from = 'info@thecahoot.com';
    var fromname = 'Lai Weiting';
    var subject = 'Welcome to The Cahoot!';

    var html = '';

    html += '<div style="font-family:\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif; max-width: 640px;">';
        html += '<p style="margin-top: 20px;">Hello';

        if (typeof user.name === 'string' && user.name.length > 0) html += ' ' + user.name;

        html += ',</p>';

        html += '<p style="margin-top: 20px;">I\'m Weiting, co-founder of The Cahoot. Thank you for joining our growing family. The Cahoot is finally ready to launch and we couldn\'t be more excited to have you!</p>';

        html += '<p style="margin-top: 20px;">We believe social shopping should be exciting and rewarding! So just explore our app, have fun with it and we will do the rest.</p>';

        html += '<p style="margin-top: 20px;">Here\'s a short guide to get you started:</p>';

        html += '<p style="margin-top: 20px;">';
            html += '<strong>Buy Anywhere</strong><br>';
            html += 'Post a product request and buy anything you want from anywhere.';
        html += '</p>';

        html += '<p style="margin-top: 20px;">';
            html += '<strong>Earn While You Travel</strong><br>';
            html += 'List your travel itinerary, take on jobs on your way and earn tips.';
        html += '</p>';

        html += '<p style="margin-top: 40px;">If you have any questions or suggestions, just drop me an email at <a href="mailto:weiting.lai@thecahoot.com">weiting.lai@thecahoot.com</a>. I would love to hear from you!</p>';

        html += '<p style="margin-top: 40px;">';
            html += 'Cheers,<br>';
            html += '<strong>Weiting</strong><br>';
            html += 'Co-founder of The Cahoot';
        html += '</br>';

        html += '<p style="margin-top: 40px;">T: +65 9674 6323 | E: <a href="mailto:weiting.lai@thecahoot.com">weiting.lai@thecahoot.com</a> | W: <a href="http://www.thecahoot.com" target="_blank">www.thecahoot.com</a><br>';
        html += '2 Orchard Link, #04-01, HubQuarters, Singapore 237978</p>';

    html += '</div>';

    debug('Firing welcome email.');

    mailer(user, html, false, null, {
        to: to,
        from: from,
        fromname: fromname,
        subject: subject
    }); 

}

module.exports = welcomeMailer;