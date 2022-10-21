require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require('./config/db')
const app = express();
const auth = require('./routes/auth')
const user = require('./routes/user')
const tweet = require('./routes/tweet')
const rateLimit = require("express-rate-limit")

app.use(express.json());
app.use(cors());


const api_rate_limiter = rateLimit({
  window: 5 * 60 * 1000, // 5 minute
  max: 100, // limit each IP to 100 requests per window minutes
});

// Applying  rate limiter  middleware to API calls 
app.use("/api/", api_rate_limiter);


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

