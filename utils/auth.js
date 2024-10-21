const jwt = require("jsonwebtoken");
secret_key = process.env.KEY || "abcdefg"

function setUser(user){
    const payload = {
        username:user.username,
        role:user.role
    }
    return jwt.sign(payload,secret_key);
}

function getUser(token){
    if(!token)return null;
    try{
        return jwt.verify(token,secret_key)
    }
    catch(error){
        console.log("error verifing token",error)
        return null;
    }
    
}

module.exports = {setUser,getUser}