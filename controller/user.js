const User = require("../models/user")
const {setUser,getUser} = require("../utils/auth")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

admin_key = process.env.ADMINKEY || "admin"

async function signup(req,res){
    const body = req.body;
    if(!body || !body.username){
        return res.json({"msg":"enter valid username"})
    }
    if(!body || !body.password){
        return res.json({"msg":"enter password"})
    }
    await User.findOne({username:body.username}).then((user)=>{
        if(user) return res.json({"msg":"enter valid username"})
    })
    body.role = "USER";
    await User.create({
        ...body
    })
    const token = setUser(req.body);
    res.cookie("token",token);
    return res.json({token});
}

async function login(req,res){
    const {username,password} = req.body;

    const user = await User.findOne({username:username});
        if(!user) return res.json({"msg":"Invalid credential"});
        const isValid = await bcrypt.compare(password,user.password)
        if(!isValid) {
           return  res.status(401).send({message: "Invalid password!"})
        }
        const token = setUser(user);
        res.cookie("token",token);
        return res.json({token});
    
}

async function adminLogin(req,res){
    const {username, password} = req.body;
    try {
        const admin =  await User.findOne({username});
        
        if(!admin) {
            return res.status(404).send({message: "Admin not found!"})
        }
        const isValid = await bcrypt.compare(password,admin.password)
        if(!isValid) {
           return  res.status(401).send({message: "Invalid password!"})
        }
        
        const token =  jwt.sign(
            {username: admin.username, role: admin.role}, 
            admin_key,
            {expiresIn: "1h"}
        )
        res.cookie("token",token);
        
        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        })
        
    } catch (error) {
       console.error("Failed to login as admin", error)
       return res.status(401).send({message: "Failed to login as admin"}) 
    }

}
module.exports = {signup,login,adminLogin}