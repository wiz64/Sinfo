const express = require("express");
const router = express.Router();
const Authentication = require("../../controllers/student/AuthController");

router.post("/auth/login", Authentication.Login);
router.post("/auth/register", Authentication.Register);
 
router.get("/check-current-user", Authentication.CheckCurrentUser);

module.exports = router;
