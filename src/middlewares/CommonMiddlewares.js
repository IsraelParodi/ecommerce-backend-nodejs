const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

module.exports.requireSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } else {
        return res.status(400).json({message: "Authorization required"});
    }
    next();
};

module.exports.customerMiddleware = (req, res, next) => {
    if (req.user.role !== "customer") {
        return res.status(400).json({message: "User Access Denied"});
    }
    next();
};

module.exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(400).json({message: "Admin Access Denied"});
    }
    next();
};
