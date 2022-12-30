var express = require('express')
const router = express.Router()

router.get('/register',(req, res) => {
    console.log(" register function called, ip address => "+req.ip)
    res.send('Registration called');
});

module.exports = router;