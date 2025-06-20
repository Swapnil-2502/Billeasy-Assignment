const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_TOKEN;

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Authorization token required"})
    }

    const token = authHeader.split(' ')[1]; 

    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        req.user = { userId: decoded.userId }; 

        next();

    }
    catch(error){
        return res.status(401).json({message: 'Invalid or expired token',error})
    }
}

module.exports = {
    authMiddleware
}