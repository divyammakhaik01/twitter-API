require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGO_URL;


const db = () =>{
mongoose.connect("mongodb+srv://admin:xfvi5qivEn73DErN@cluster0.agm8q.mongodb.net/?retryWrites=true&w=majority")
const conn  = mongoose.connection;
conn.once('open' , () => {
    console.log("database connected ");
})
conn.on('error' , (error)=>{
    console.log("error : " ,  error);
})

}

module.exports = db;