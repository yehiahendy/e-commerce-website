const express = require('express');
const router =  express.Router();
const {creat} = require('../controllers/products');
const {requireSignin,isAuth,isAdmin} = require('../controllers/auth')
const {userById} =require('../controllers/user')
const {productById} = require('../controllers/products')
const {remove} = require('../controllers/products')
const {update} = require('../controllers/products')
router.post("/product/creat/:userId",requireSignin,isAuth,isAdmin,creat);
router.delete("/product/remove/:productId/:userId",requireSignin,isAuth,isAdmin,remove);
router.put("/product/update/:productId/:userId",requireSignin,isAuth,isAdmin,update);
//test the productById
router.get("/product/test/:productId",(req,res) =>{
    res.json({Hi: "I'm still here"})
});

router.param("userId",userById);
router.param("productId",productById);
module.exports = router;