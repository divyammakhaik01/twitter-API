const User = require("../models/User");

const login = async (req, res) => {
  //login api logic here
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.json({
      message: "Please provide email and password",
      statusCode: 400,
    });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({
      message: "The email is not yet registered to an accout",
      statusCode: 400,
    });
  }

  const match = await user.checkPassword(password);

  if (!match) {
    return res.json({ message: "The password does not match", statusCode: 400 });
  }
  const token = user.getJwtToken();
  // 
  req.user = user;
  res.status(200).json({ success: true, token , user });
};

const register = async (req, res) => {
  const { email , username, password } = req.body;

  const userList = await User.find({email : email , username : username , password : password});

  // check whether user already registered 

  if(userList != NULL){
    return res.json({
      "status" : "false",
      "message" : "user already exist with this username or email"
    })
  }
  
  const user = await User.create({ username, password });
  const token = user.getJwtToken();
  res.status(201).json({ success: true, token: token });
};

const AuthController = {
  login,
  register,
};

module.exports = AuthController;
