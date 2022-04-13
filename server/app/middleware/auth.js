const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = (req, res, next) => {
    // authorization Baser ádfkajsdlfjaskldfja
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(' ')[1];
    if(!token)
        return res
        .status(400)
        .json({success : false, message : "Access token not found"});
    
    try {
        const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({success : false, message : "Invalid token"});
    }
}

module.exports = verifyToken;