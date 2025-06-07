const express = require('express')
const app = express()
const cors = require('cors');
const { ConnectMongoDB } = require('./connection');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

ConnectMongoDB(process.env.MONGODB_URL)

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use('/api/auth',authRoutes)
app.use('/api',bookRoutes)

app.get("/",(req,res)=>{
    res.send("From Home Page")
})

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})