const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/auth');


router.get("/",verifyToken,authController.getUser);
router.post("/register",authController.register);
router.post("/login",authController.login);

module.exports = router;