var express = require('express')
const router = express.Router()

router.get('/login',(req, res) => {
    console.log('login called. ip address -> '+req.ip)
    res.send(`login called`)
    
});
module.exports = router;