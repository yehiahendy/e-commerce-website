const { Order, CartItem } = require('../models/order')
const {errorHandler} = require('../helpers/dbErrorHandler');
exports.create = (req,res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err,data) => {
        if(err)
        {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        else{
        return res.json(data)
        }
    })
}
exports.listOrders = (req, res) => {
        Order
        .find()
        .populate('user','name')
        .sort('-creat')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            return res.json(orders);
        });
};
exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(order);
        }
    );
};
exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};