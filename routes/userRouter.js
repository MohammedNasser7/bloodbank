const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const userRouter = express.Router();
const { restrictTo } = require("../middlewares/authmiddleware");

userRouter.post("/signup", authController.signup);

userRouter.post("/login", authController.login);
 

userRouter.get(
  "/patients",
  restrictTo('patient'),
  userController.getPatients
);
userRouter.post("/blood-banks/create-donation-camp",
  restrictTo('blood bank'),
  userController.createDonationCamp
);

module.exports = userRouter;
