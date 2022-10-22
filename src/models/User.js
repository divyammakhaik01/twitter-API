// User Model
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
      trim: true,
      index: true, unique: true, sparse: true
    },
  
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    followersCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    Tweets: [{ type: mongoose.Schema.ObjectId, ref: "Tweet" }],
    TweetCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: 10,
    });
  };
  
  UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  module.exports = mongoose.model("User", UserSchema);


  