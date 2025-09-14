const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const app = express();
const PORT = process.env.PORT;

dotenv.config();

app.use(express.json());

    // connect to DB 
    connectDB();

app.get("/",(req, res)=>{
    res.send("Hello World!!")
})

app.use("/api",productRoutes);

app.listen(PORT,()=>{
    console.log(`Product app is  running at PORT ${PORT}`)
}) 