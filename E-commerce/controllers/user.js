const User = require('../models/user')
const { Order, CartItem } = require('../models/order')
const {errorHandler} = require('../helpers/dbErrorHandler');
exports.userById = (req,res,next,id) =>
{ 
    User.findById(id).exec((err,user) => {
        if (err || !user)
        {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user ; // search about profile ?? 
        next();
    });
};
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.update = (req, res) => {
    const { email, password, name } = req.body;
    if(password !== '')
    {
        User.findById(req.profile._id )
        .exec((err,data) => {
            if(err)
            {
                return res.status(400).json({
                    error: err
                })
            }
            const pass = data.encryptPassword(password)
            User.findOneAndUpdate(
                { _id: req.profile._id },
                { $set: {name:name, email:email ,hashed_password : pass}},
                
                (err, user) => {
                    if (err) {
                        return res.status(400).json({
                            error: "You are not authorized to perform this action"
                        });
                    }
                    user.hashed_password = undefined;
                    user.salt = undefined;
                    res.json(user);
                }
            );
        })
    }
    else
    {
        User.findOneAndUpdate(
            { _id: req.profile._id },
            { $set: req.body},
            
            (err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "You are not authorized to perform this action"
                    });
                }
                user.hashed_password = undefined;
                user.salt = undefined;
                res.json(user);
            }
        );
    }
    
};

exports.addOrderToUser = (req,res,next) => {
    let history = []
    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name ,
            description:item.description ,
            category: item.category,
            quantity:item.count ,
            transaction_id: req.body.order.transaction_id,
            amount : req.body.order.amount 
        })
    });
    User.findOneAndUpdate
    (
        {_id: req.profile._id},
        {$push : {history: history}},
        {new : true},
        (err,data) => {
            if(err)
            {
                return res.status(400).json({
                    error: 'Could not update user purchase'
                })
            }
            next();
        }
    )

}
exports.purchaseHistory = (req, res) => {
    Order
    .find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, orders) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        console.log("Mine",orders)
        return res.json(orders);
    });
};
/*
.find({ user: req.profile._id })
.populate("user", "_id name")
.sort("-created")
*/