const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    createCategory,
    getCategories,
} = require("../controllers/CategoryController");
const {
    adminMiddleware,
    requireSignIn,
} = require("../middlewares/CommonMiddlewares");
const {
    multerUpload
} = require("../utils/CommonUtils");

const storage = multerUpload();
const upload = multer({storage});

router.post("/category/create", requireSignIn, adminMiddleware, upload.single('categoryImage'), createCategory);
router.get("/category/get", getCategories);

module.exports = router;
