const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
module.exports.multerUpload = (req, res, next) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(path.dirname(__dirname), "uploads"));
        },
        filename: function (req, file, cb) {
            cb(null, shortid.generate() + "-" + file.originalname);
        },
    });
};