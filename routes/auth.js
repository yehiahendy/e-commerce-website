const express = require('express');
const router =  express.Router();
const {signup} = require('../controllers/auth');
const {signin,signout} = require('../controllers/auth');
const {userSignupValidator}= require('../validator/index');
const {requireSignin} = require('../controllers/auth')
const {isAuth} = require('../controllers/auth');
const {isAdmin} = require('../controllers/auth');
const  userById = require('../controllers/user').userById;

router.post('/signup',userSignupValidator,signup);
router.post('/signin',signin);
router.get('/signout',signout);
router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res) => {
res.json(req.profile);
});
router.param("userId",userById);
module.exports = router;