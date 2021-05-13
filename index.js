const express = require("express");

const userRoutes = require("./views/users")

const sessionRoutes = require("./views/session")

const app = express();

var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");

const bodyParser = require("body-parser")

require("dotenv").config();

const port = 8080;

app.use(bodyParser.json())
app.use(cookieParser())

app.get("/", (req,res) => {
return res.send("app working")
}  )

mongoose
  .connect( process.env.DATABASE  , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  }).catch(err => {console.log(err)} )

app.use("/api",userRoutes);

app.use("/api",sessionRoutes)





app.listen(port  , console.log(`port started running on ${port}`))