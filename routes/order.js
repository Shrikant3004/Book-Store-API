const express = require('express');
const { makeOrder, OrderByEmail } = require('../controller/order');
const {restrictTologinBrowzer,restrictTologin,verifyAdminToken} = require("../middleware/auth");


const router =  express.Router();


router.post("/order",restrictTologin,makeOrder);
router.get("/order/:email",restrictTologin,OrderByEmail);

module.exports = router;