var express = require('express')
const router = express.Router()
var classes = require('../modules/classes');

router.post('/register',(req, res) => {
    var data = {
        username : req.query.username,
        // password transportation should be secured by custom encryption between client and server
        // something like password : modules.passcrypt.d(req.query.password)
        password : req.query.password,
        name : req.query.name,
        email : req.query.email
    }
    console.log(" register function called, ip address => "+req.ip);
    res.send('Registration called');
    var  x = new classes.User(data.name, data.username, data.email, data.password).register()
});

router.post('/login',(req, res) => {
    var data = {
        username : req.query.username,
        // something like password : modules.passcrypt.d(req.query.password)
        password : req.query.password,
    }
    console.log('login called. ip address => '+req.ip)
    res.send(`login called`)
    var x = new classes.Login(data.username,data.password).verify();
    
});
module.exports = router;