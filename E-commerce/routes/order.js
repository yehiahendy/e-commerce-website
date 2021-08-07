const express = require('express')
const router = express.Router(); 
const {requireSignin} = require('../controllers/auth');
const {isAuth} = require('../controllers/auth');
const  userById = require('../controllers/user').userById;
const {create}  = require('../controllers/order')
router.post("/order/create/:userId",requireSignin,isAuth,create)
router.param('userId',userById)
module.exports = router;