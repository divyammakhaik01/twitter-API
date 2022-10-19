const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    required: [true, "Please enter the caption"],
    trim: true,
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  retweets: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  likesCount: {
    type: Number,
    default: 0,
  },
  retweetCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tweet", TweetSchema);