//requires 
const express  = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator');
const cors  = require('cors');

require("dotenv").config(); 
//routes 
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/products')
//database connection 
mongoose.connect(process.env.DATA_BASE,{
useNewUrlParser : true,////????
useCreateIndex: true //////?????
}).then(()=> console.log('DB connection'));
//app 
const app = express();
// middleware
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());
app.use('/api',authRoutes);
app.use('/api',categoryRoutes);
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",productRoutes);
const port = process.env.PORT;
app.listen(port,function () {console.log("Server is running "+port);});
