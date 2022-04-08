const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/register",urlencodedParser,authController.register);
router.post("/login",authController.login);

module.exports = router;