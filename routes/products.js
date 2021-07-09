const express = require('express');
const router =  express.Router();
const {creat} = require('../controllers/products');
const {requireSignin,isAuth,isAdmin} = require('../controllers/auth')
const {userById} =require('../controllers/user')
const {productById} = require('../controllers/products')
const {remove} = require('../controllers/products')
const {update} = require('../controllers/products')
const {list,listRelated,listCategories,listBySearch,photo} = require('../controllers/products')
router.post("/product/creat/:userId",requireSignin,isAuth,isAdmin,creat);
router.delete("/product/remove/:productId/:userId",requireSignin,isAuth,isAdmin,remove);
router.put("/product/update/:productId/:userId",requireSignin,isAuth,isAdmin,update);
//test the productById
router.get("/product/test/:productId",(req,res) =>{
    res.json({Hi: "I'm still here"})
});
router.get('/products',list);
router.get('/products/categories',listCategories);
router.get('/products/relate/:productId',listRelated);
router.post("/products/by/search", listBySearch);
router.get('/products/photo/:productId',photo);
router.param("userId",userById);
router.param("productId",productById);
module.exports = router;