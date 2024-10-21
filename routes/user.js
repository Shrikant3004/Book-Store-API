const express =  require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {signup,login,adminLogin}  = require('../controller/user')
const router =  express.Router();



router.post("/admin", adminLogin)
router.post('/signup',signup);
router.post('/login',login);

module.exports = router;