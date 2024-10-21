const express = require("express")
require("./connect")
const book = require("./routes/book")
const order = require("./routes/order")
const user = require("./routes/user")

const app = express()
const port = process.env.PORT || 8000

app.use(express.json());

app.use("/api",book)
app.use("/api",order)
app.use("/api",user)

app.listen(port,()=>{
    console.log("server started");
})