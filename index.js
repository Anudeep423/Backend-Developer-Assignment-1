const express = require("express");

const userRoutes = require("./views/users")

const sessionRoutes = require("./views/session")
const app = express();
const cors = require("cors");
const morgan = require("morgan");

var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");

const bodyParser = require("body-parser")

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for JSONPlaceholder',
      version: '1.0.0'
     
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./views/*.js'],
  };
  
  const swaggerSpec = swaggerJSDoc(options);



//   const specs = swaggerJsDoc(options);

require("dotenv").config();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.listen(port  , console.log(`port started running on ${port}`))