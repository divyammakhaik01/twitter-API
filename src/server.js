require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require('./config/db')
const app = express();
const auth = require('./routes/auth')
const user = require('./routes/user')
const tweet = require('./routes/tweet')

app.use(express.json());
app.use(cors());

app.use("/api" , auth)
app.use("/api" , user)
app.use("/api" , tweet)
  

// sample for express server
app.use("/", (req, res, next) => {
  res.status(200).json({ success: true, data: "Start Here" });
});


const PORT = process.env.PORT || 8080; // port at which server listening

app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`),
  db()
);

// fetch routes
let userRouter = require('./routes/user');

//define root routes.
// app.use('/user', userRouter);

