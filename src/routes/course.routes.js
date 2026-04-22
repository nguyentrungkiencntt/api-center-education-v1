const express = require("express");
const router = express.Router();
const controller = require("../controllers/course.controller");

router.get("/course/:codecourse", controller.course);

module.exports = router;