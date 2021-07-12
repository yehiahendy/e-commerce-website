const express = require('express');
const router =  express.Router();
const {creat,read,update,remove,list} = require('../controllers/category');
const {requireSignin} = require('../controllers/auth')
const {isAuth} = require('../controllers/auth');
const {isAdmin} = require('../controllers/auth');
const  userById = require('../controllers/user').userById;
const {categoryById} =  require('../controllers/category')
router.post('/category/creat/:userId',requireSignin,isAuth,isAdmin,creat);
router.get('/category/read/:categoryId',read);
router.put('/category/update/:categoryId/:userId',requireSignin,isAuth,isAdmin,update);
router.delete('/category/remove/:categoryId/:userId',requireSignin,isAuth,isAdmin,remove);
router.get('/category/list',list);
router.param("userId",userById);
router.param("categoryId",categoryById);
module.exports = router;