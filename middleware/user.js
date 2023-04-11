
require("dotenv").config();
const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyAdminMiddleware = (req, res, next) => {
    if(req.header('Authorization')==undefined){
        res.send(500).message("Invalid access")
    }
    const token = req.header('Authorization').split(' ');
    if (!token) return res.status(403).json({
        msg: "No token present"
    }); 
    try {
        const decoded = jwt.verify(token[1],
            process.env.JWT_USER_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            msg: "Invalid Token"
        });
    }
    next();
};


module.exports=verifyAdminMiddleware