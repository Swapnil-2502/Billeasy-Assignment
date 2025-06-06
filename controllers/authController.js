const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_TOKEN;

exports.signup = async (req,res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({name,email,password:hashedPassword})
        await user.save()

        res.status(201).json({ message: 'User created successfully', user }); 
    }
    catch(error){
        res.status(500).json({ error: 'Server error',error });
    }
}

exports.login = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'User Logged In successfully',token }); 

    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
}