const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user.controller');

// Create routes for user here


router.route('/follow').post(UserController.follow);
router.route('/getFollowers/:id').get(UserController.getFollowers);
router.route('/getUserStats/:id').get(UserController.getUserStats);
router.route('/searchUser').post(UserController.searchUser);



module.exports = router;