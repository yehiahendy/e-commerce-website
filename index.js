//requires 
const express  = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require("dotenv").config(); 
//routes 
const userRoutes = require('./routes/user')
//app 
const app = express();
// middleware
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());

//database connection 
mongoose.connect(process.env.DATA_BASE,{

    useNewUrlParser : true,////????
    useCreateIndex: true //////?????
}).then(()=> console.log('DB connection'));

app.use("/api",userRoutes);
const port = process.env.PORT;
app.listen(port,function () {
   
    console.log("Server is running "+port);
});
