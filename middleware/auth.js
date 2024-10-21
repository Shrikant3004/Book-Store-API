const {setUser,getUser} = require("../utils/auth")
admin_key = process.env.ADMINKEY || "admin"
const jwt = require("jsonwebtoken")

function restrictTologinBrowzer(req,res,next){
    const token = req.cookie?.token;
    if(!token) return res.render("/login");
    const user = getUser(token);
    req.user = user;
    next();
}

function restrictTologin(req,res,next){
    const token = req.headers['authorization'];
    if(!token){return res.status(401).json({ message: 'Access Denied. No token provided' });}
    const id = token.split("Bearer ")[1]; 
    const user = getUser(id);
    req.user = user;
    next();
}

const verifyAdminToken =  (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided' });
    }
    jwt.verify(token, admin_key, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid credientials' });
        }
        req.user = user;
        next();
    })

}

module.exports = {restrictTologinBrowzer,restrictTologin,verifyAdminToken};