const Tweet = require("../models/Tweet");
const User = require("../models/User");

const tweet = async (req, res) => {
  //tweet api logic here
  const { caption, userID } = req.body;

  try {
    // add tweet
    const user = await User.find({ _id: userID });
    if (!user) {
      return res.json({
        status: "false",
        message: "user missing !!",
      });
    }

    if (!caption) {
      return res.json({
        status: "false",
        message: "caption missing !!",
      });
    }

    let curr_user = user[0]._id;
    const NewTweet = await Tweet.create({ user: curr_user, caption: caption });

    let current_tweets_count = user[0].TweetCount;
    let current_user_tweets = user[0].Tweets;

    current_user_tweets.push(NewTweet._id);

    const UpdatedUser = await User.findByIdAndUpdate(userID, {
      Tweets: current_user_tweets,
      TweetCount: current_tweets_count + 1,
    });

    res.json({
      status: "true",
      message: "tweet added",
    });
  } catch (err) {
    return res.json({
      status: "false",
      error: err,
    });
  }
};

const deleteTweet = async (req, res) => {
  //deleteTweet api logic here

  const { tweetID, userID } = req.body;

  try {
    const user = await User.find({ _id: userID });

    const tweet = await Tweet.findOne({ _id: tweetID });

    if (tweet == NULL) {
      return res.json({
        status: "false",
        message: "tweet not found ",
      });
    }
    // check whether user has permission to delete the tweet
    if (user[0].Tweets.includes(tweet.user)) {
      return res.json({
        status: "false",
        message: "No permission",
      });
    }

    // update user database after deletion of tweet

    const tweet_count = user[0].TweetCount;
    let tweetsList = user[0].Tweets;
    let index_of_deleted_tweet = tweetsList.findIndex(tweet._id);
    tweetsList.splice(index_of_deleted_tweet, 1);

    const UpdatedUser = await User.findByIdAndUpdate(user[0]._id, {
      Tweets: tweetsList,
      TweetCount: tweet_count - 1,
    });

    // delete tweet

    const DeletedTweet = await Tweet.findOneAndDelete({ _id: tweetID });

    return res.json({
      status: "true",
      message: DeletedTweet,
    });
  } catch (error) {
    return res.json({
      status: "false",
      error: error,
    });
  }
};

const likeTweet = async (req, res) => {
  //likeTweet api logic here

  const { tweetID, userID } = req.body;

  try {
    const tweet = await Tweet.find({ _id: tweetID });
    const user = await User.find({ _id: userID });

    // check if user exist
    if (!user) {
      return res.json({
        status: "false",
        message: "user not found ",
      });
    }

    // check if tweet exist
    if (!tweet) {
      return res.json({
        status: "false",
        message: "tweet not found ",
      });
    }

    const likeCount = tweet[0].likesCount;
    let likeList = tweet[0].likes;

    // check if the current user has already liked the tweet
    if (likeList.includes(user[0]._id)) {
      let index = likeList.indexOf(user[0]._id);
      likeList.splice(index, 1);
      const updatedTweet = await Tweet.findByIdAndUpdate(tweetID, {
        likesCount: likeCount - 1,
        likes: likeList,
      });
      return res.json({
        status: "true",
        message: "tweet has been updated",
        like_status: "false",
      });
    } else {
      likeList.push(user[0]._id);
      try {
        const updatedTweet = await Tweet.findByIdAndUpdate(tweetID, {
          likesCount: likeCount + 1,
          likes: likeList,
        });
        return res.json({
          status: "true",
          message: "tweet has been updated",
          like_status: "true",
        });
      } catch (error) {
        return res.json({
          status: "false",
          error: error,
        });
      }
    }
  } catch (error) {
    return res.json({
      status: "false",
      error: error,
    });
  }
};

const NotesController = {
  tweet,
  deleteTweet,
  likeTweet,
};

module.exports = NotesController;
