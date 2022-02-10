const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");

router.post("/api/v1/register", usercontroller.registerUser);
router.post("/api/v1/login", usercontroller.loginUser);
router.get("/api/v1/users", usercontroller.getAllUsers);
router.get("/api/v1/user/:id", usercontroller.getUser);
router.get("/api/v1/qrcode", usercontroller.getQrCode)

module.exports = router;
