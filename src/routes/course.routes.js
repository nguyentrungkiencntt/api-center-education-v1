const express = require("express");
const router = express.Router();
const controller = require("../controllers/course.controller");

router.post("/register", controller.registerCourse);

router.get("/registrations", controller.getCourseRegistrations);

router.get("/registrations/:id", controller.getRegistrationById);

router.delete("/registrations/:id", controller.deleteRegistration);

module.exports = router;
