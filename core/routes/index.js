const express = require("express");
const router = express.Router();
const StudentRoutes = require("./api/studentRoutes");
// const AdminRoutes = require("./api/adminRoutes");
router.use("/student", StudentRoutes);
// router.use("/admin", AdminRoutes);

module.exports = router;
