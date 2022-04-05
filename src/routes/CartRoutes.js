const express = require("express");
const router = express.Router();
const { addItemToCart } = require("../controllers/CartController");
const {
  customerMiddleware,
  requireSignIn,
} = require("../middlewares/CommonMiddlewares");

router.post(
  "/user/cart/addtocart",
  requireSignIn,
  customerMiddleware,
  addItemToCart
);

module.exports = router;
