const User = require('../models/user')
const {errorHandler} = require('../helpers/dbErrorHandler')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt');
const user = require('../models/user');
const express  = require('express');
/*******************************************************
 * 
 * creat sign up method 
 * 
 ********************************************************/
exports.signup = (req,res) =>{
    console.log("req.body",req.body)
    const user   = new User(req.body);
    //console.log("this is user");
    //console.log(user);
    user.save((error,user) =>{
        if(error)
        {
            return res.status(400).json({
                error: errorHandler(error)
            })


        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });

    });
    
};
/*********************************************************************************
 *
 *  create sgin in method 
 * 
 *********************************************************************************/

exports.signin = (req,res) => 
{
    //find the user based on email 
    const {email,password} = req.body
    User.findOne({email},(error,user) => {
        if (error || !user)
        {
            return res.status(400).json({
                error : "User dose not exist"
            })
        }
        //if the user is exist check that the pass and email are match with db 
        if(!user.authorization(password))
        {
            return res.status(401).json({
                error : "Email and password  don't match"
            })
        }
         //creat the user sign in token
        const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET) ;
        // presist the token with the cookie 
        res.cookie('t',token,{expire : new Date()+9999});
        const{_id,name,email,role}  = user
        return res.json({
            token,
            user : {_id,name,email,role} 
        });  
        
    });
}
/*********************************************************
 * 
 * creat sign out methods
 */
exports.signout= (req,res) =>{
    res.clearCookie("t");
    res.json({
        messeag  : "Sign out"
    });

}


/**************************************************************
 * 
 * creat required sign in method
 */
exports.requireSignin = expressJwt({
secret: process.env.JWT_SECRET,
algorithms: ["HS256"], // added later
userProperty: "auth",

});
/**************************************************
 * 
 * creat isAdmin middleware
 */
exports.isAuth   = (req,res,next) => 
{
    console.log(req.profile);

let user =( req.profile && req.auth && req.profile._id ) == req.auth._id ;
if (!user)
{
    return res.status(403).json({Error: "Access denied"});
} 
next();
};
/**************************************************
 * 
 * creat isAuth middleware
 */
exports.isAdmin = (req,res,next) => 
{
    
if(req.profile.role  === 0)
{
return res.status(403).json({Error: "Access Denied"});
}
    next();
};
