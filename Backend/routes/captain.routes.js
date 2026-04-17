const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerCaptain } = require("../controllers/captain.controller");

//route post/captains/register

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullName.lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Vehicle plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be either car, motorcycle, or auto"),
  ],
  registerCaptain,
);

module.exports = router;
