const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Create routes for user here

router.route("/login").post(AuthController.login);
router.route("/register").post(AuthController.register);


module.exports = router;