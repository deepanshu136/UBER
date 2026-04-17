const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.services");
const { validationResult } = require("express-validator");

const registerCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password, vehicle } = req.body;

  const isCaptainExist = await captainModel.findOne({ email });

  if (isCaptainExist) {
    return res
      .status(400)
      .json({ message: "Captain with this email already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

module.exports = {
  registerCaptain,
};
