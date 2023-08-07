const express = require("express");
const dotenv = require("dotenv").config({ path: "config.env" });
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const app  = express()
const path = require('path')

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

app.use(express.static(path.join(__dirname+"/public")))
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/',require("./routes/authRoutes"))

const port = process.env.PORT|| 5000;
console.log(port)
app.listen(port, ()=> console.log(`Server is running on port ${port}`))