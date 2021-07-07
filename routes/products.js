const express = require('express');
const router =  express.Router();
const {creat} = require('../controllers/products');
const {requireSignin,isAuth,isAdmin} = require('../controllers/auth')
const {userById} =require('../controllers/user')
router.post("/product/creat/:userId",creat,requireSignin,isAuth,isAdmin);
router.param("userId",userById);
module.exports = router;