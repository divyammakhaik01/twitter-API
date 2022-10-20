const Tweet = require("../models/Tweet");
const User = require("../models/User");

const follow = async (req, res) => {
  //follow api logic here

  const { source_userID, destination_userID } = req.body;

  // sourceID  --->  destID

  try {
    // find sourceUser

    const sourceUser = await User.findById(source_userID);

    // check if sourceUser exits

    if (!sourceUser) {
      return res.json({
        status: "false",
        message: "sourceUser not found",
      });
    }

    // find destinationUser

    const destinationUser = await User.findById(destination_userID);

    // check if destinationUser exists

    if (!destinationUser) {
      return res.json({
        status: "false",
        message: "destinationUser not found",
      });
    }

    // check if sourceUser is already following destUser
    if (sourceUser.following.includes(destinationUser._id)) {
      return res.json({
        status: "false",
        message: "SourceUser already following DestiUser",
      });
    }

    // current sourceUser following count

    const sourceUser_following_Count = sourceUser.followingCount;

    // current sourceUser following List

    let sourceUser_followingList = sourceUser.following;

    sourceUser_followingList.push(destinationUser._id);

    // update source User

    const updatedSourceUser = await User.findByIdAndUpdate(source_userID, {
      followingCount: sourceUser_following_Count + 1,
      following: sourceUser_followingList,
    });

    //   ---------------------------------------------------------------------------------

    // current destinationUser followers count

    const destinationUser_followers_Count = destinationUser.followersCount;

    // current destinationUser followers List

    let destinationUser_followersList = destinationUser.followers;

    destinationUser_followersList.push(sourceUser._id);

    // update destination User

    const updateddestinationUser = await User.findByIdAndUpdate(
      destination_userID,
      {
        followersCount: destinationUser_followers_Count + 1,
        followers: destinationUser_followersList,
      }
    );

    return res.json({
      status: "true",
      message: "success",
    });
  } catch (error) {
    res.json({
      status: "false",
      message: error,
    });
  }
};

const getFollowers = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    let followers_count = user.followersCount;
    let list = user.followers;

    // get users
    let followers_list = [];
    
    for(let i = 0 ; i < followers_count ; i++){
      let findUser = await User.findById(list[i]);
      followers_list.push(findUser);
    }
    
    return res.json({
      status: "true",
      message: {
        count: followers_count,
        list: followers_list,
      },
    });
  } catch (error) {
    return res.json({
      status: "false",
      message: error,
    });
  }
};

const getUserStats = async(req, res) => {
  //getUserStats api logic here
  const {id} = req.params;
  try {
    const user = await User.findById(id);

    // console.log(user);

    if(!user){
      
      return res.json({
        "status" : "false",
        "message" :"User doesn't exists"
      })
    }
    res.json({
      "status" :"true",
      "message":user
    })
    
  } catch (error) {
    return res.json({
      status: "false",
      message: error,
    });    
  }
  
};

const searchUser = async(req, res) => {

  const {userName} = req.body;
  
  try {
    const user = await User.find().where('username').equals(userName)

    if(user.length == 0){
      return res.json({
        "status" :"false",
        "message" : "No user found with this username"
      })
    }
    
    res.json({
      "status" :"true",
      "message" : user
    })
    
  } catch (error) {
    return res.json({
      status: "false",
      message: error,
    });     
  }

  
};

const getTweetsForUser = (req, res) => {
  //get all tweets for a user api logic here
  
};

const UserController = {
  follow,
  getFollowers,
  getUserStats,
  searchUser,
  getTweetsForUser,
};

module.exports = UserController;
