const express = require('express')
const router = express.Router(); 
const {requireSignin} = require('../controllers/auth');
const {isAuth} = require('../controllers/auth');
const  userById = require('../controllers/user').userById;
const {generateToken,processPayment}  = require('../controllers/braintree')
router.get('/braintree/gettoken/:userId',requireSignin,isAuth,generateToken)
router.post(
    "/braintree/payment/:userId",
    requireSignin,
    isAuth,
    processPayment
);
router.param('userId',userById)
module.exports = router;