const Order = require("../models/order");
const User = require("../models/user");

async function makeOrder(req,res){
    try {
        const user = await User.findOne({username:req.user.username})
        req.body.createdBy = user._id
        const result = await Order.create({
            ...req.body,
        });
        return res.status(201).json({"msg":"Order Created successfully"});
      } catch (error) {
        console.error("Error creating order", error);
        return res.status(500).json({ message: "Error creating order" });
      }
}

async function OrderByEmail(req,res){
    try {
        const {email} = req.params;
        const orders = await Order.find({email:email}).sort({createdAt: -1});
            if(orders.length===0) {
                return res.status(404).json({ message: "Order not found" });
              }
        const user = await User.findOne({username:req.user.username})
                if(!user || orders[0].createdBy.toString() !== user._id.toString()){
                  return res.status(403).json({ "message": "Forbidden" });
                }
              
              return res.status(200).json(orders);
        

      } catch (error) {
        console.error("Error fetching orders", error);
        return res.status(500).json({ message: "Error fetching orders" });
      }    
}

module.exports = {makeOrder,OrderByEmail}