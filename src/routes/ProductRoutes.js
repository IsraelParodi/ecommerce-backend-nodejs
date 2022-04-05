const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const {
    createProduct,
    //   getCategories,
} = require("../controllers/ProductController");
const {
    adminMiddleware,
    requireSignIn,
} = require("../middlewares/CommonMiddlewares");
const {
    multerUpload
} = require("../utils/CommonUtils");

const storage = multerUpload();
const upload = multer({storage});

router.post(
    "/product/create",
    requireSignIn,
    adminMiddleware,
    upload.array("productPicture"),
    createProduct
);
//router.get("/product/get", getCategories);

module.exports = router;
