const mongoose = require("mongoose")

const url = process.env.URL || "mongodb://localhost:27017/book"
mongoose.connect(url).then(()=>console.log("mongo db connected")).catch(err=>console.log(err));
