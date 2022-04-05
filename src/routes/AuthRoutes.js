const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/AuthController");
const { requireSignIn } = require("../middlewares/CommonMiddlewares");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/AuthValidator");

router.post("/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/profile", requireSignIn, (req, res) => {
  res.status(200).json({ user: "profile" });
});

module.exports = router;
