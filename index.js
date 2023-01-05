const express = require('express')
var app = express()
var routes = require('./api/routes.js')
var auth = require('./api/auth.js')
app.get('/', function (req, res) {
    res.json({
                status:'online',
                author:'wiz64',
                github:'https://github.com/wiz64/Sinfo'})
 });
app.use(routes);
app.use(auth)
app.use('/*',express.static('public_html'))
 var server = app.listen(8000)