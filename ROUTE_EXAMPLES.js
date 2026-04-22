// Example: How to use authentication middleware in your routes
// This file shows best practices for protecting routes

const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.middleware");
const verifyRole = require("../middlewares/verifyRole.middleware");
const controller = require("../controllers/your.controller");

router.post("/auth/register", (req, res) => {

});

router.post("/auth/login", (req, res) => {

});

router.get("/profile", verifyToken, controller.getProfile);

router.put("/profile", verifyToken, controller.updateProfile);

router.post("/courses", 
  verifyToken, 
  verifyRole("R1", "R2"), 
  controller.createCourse
);

router.put("/courses/:id", 
  verifyToken, 
  verifyRole("R1", "R2"), 
  controller.updateCourse
);

router.delete("/courses/:id", 
  verifyToken, 
  verifyRole("R1"), 
  controller.deleteCourse
);


router.post("/courses/:id/enroll", 
  verifyToken, 
  verifyRole("R3"), 
  controller.enrollCourse
);

router.get("/users", 
  verifyToken, 
  verifyRole("R1"), 
  controller.getAllUsers
);

router.delete("/users/:id", 
  verifyToken, 
  verifyRole("R1"), 
  controller.deleteUser
);

router.post("/admin/reports", 
  verifyToken,                    // Step 1: Verify token exists
  verifyRole("R1"),                // Step 2: Verify user is Admin
  (req, res, next) => {            // Step 3: Custom validation
    if (!req.query.dateRange) {
      return res.status(400).json({
        error: 1,
        message: "dateRange parameter is required"
      });
    }
    next();
  },
  controller.generateReport
);

module.exports = router;

