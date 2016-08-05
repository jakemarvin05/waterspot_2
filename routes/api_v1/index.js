var express = require('express');
var router = express.Router();

router.get('/users', function(req,res){
    res.send(
        {users:[{user:{
            name:'Jake Marvin Alim',
            age: 22,
            about: 'Loving...'
        }}]}
    );
});

router.get('/', function(req,res){
    res.send('hey');
 });

module.exports = router;