const express = require("express");
const router = express.Router();
const TweetController = require('../controllers/tweet.controller');

// Create routes for product here

router.route("/addtweet").post(TweetController.tweet);
router.route("/liketweet").post(TweetController.likeTweet);
router.route("/deletetweet").delete(TweetController.deleteTweet);


module.exports = router;