const express = require('express')
const app = express()
const cors = require('cors');
const { ConnectMongoDB } = require('./connection');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

ConnectMongoDB(process.env.MONGODB_URL)

app.get("/",(req,res)=>{
    res.send("From Home Page")
})

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})