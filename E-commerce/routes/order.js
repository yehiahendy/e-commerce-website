const express = require('express')
const router = express.Router(); 
const {requireSignin, isAdmin} = require('../controllers/auth');
const {isAuth} = require('../controllers/auth');
const  userById = require('../controllers/user').userById;
const  {addOrderToUser} = require('../controllers/user');
const {create,listOrders}  = require('../controllers/order')
const {decreaseQuantity} = require('../controllers/products')
const {getStatusValues} = require('../controllers/order')
const {updateOrderStatus} = require('../controllers/order')
const {orderById} = require('../controllers/order')
router.post("/order/create/:userId",requireSignin,isAuth,addOrderToUser,decreaseQuantity,create)
router.get("/order/list/:userId",requireSignin,isAuth,isAdmin,listOrders)
router.get(
    "/order/status-values/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    getStatusValues
);
router.put(
    "/order/:orderId/status/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateOrderStatus
);
router.param("userId", userById);
router.param("orderId", orderById);
module.exports = router;