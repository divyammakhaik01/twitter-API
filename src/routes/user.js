const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user.controller');

// Create routes for user here


router.route('/follow').post(UserController.follow);
router.route('/getFollowers/:id').get(UserController.getFollowers);
router.route('/getUserStats/:id').get(UserController.getUserStats);
router.route('/searchUser').post(UserController.searchUser);




// 635052311dcd6f5ddf0a498a
// 635052861dcd6f5ddf0a498e ajay

module.exports = router;