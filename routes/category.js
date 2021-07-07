const express = require('express');
const router =  express.Router();
const {creat} = require('../controllers/category');
const {requireSignin} = require('../controllers/auth')
const {isAuth} = require('../controllers/auth');
const {isAdmin} = require('../controllers/auth');
const  userById = require('../controllers/user').userById;
router.post('/category/creat/:userId',requireSignin,isAuth,isAdmin,creat);
router.param("userId",userById);
module.exports = router;