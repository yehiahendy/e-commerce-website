const express = require('express');
const router =  express.Router();
const  userById = require('../controllers/user').userById;
const {requireSignin} = require('../controllers/auth')
const {isAuth} = require('../controllers/auth');
const {read,update,purchaseHistory} = require('../controllers/user')
router.get("/user/:userId",requireSignin,isAuth,read)
router.get("/order/by/:userId",requireSignin,isAuth,purchaseHistory)
router.put("/user/:userId",requireSignin,isAuth,update)
router.param("userId",userById);
module.exports = router;