const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs  = require('fs');
const {errorHandler} = require('../helpers/dbErrorHandler');
//creat product method
exports.creat = (req,res) => {
    const product = new Product (req.body);
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files) => {
        if(err)
        {
            return res.status(400).json({
            error: "image can't be uploaded"
            });
        }
        // make constrains to file size
        //maximum file size = 1000000 =====> 1 mb 
        if (files.photo.size > 1000000)
        {
            return res.status(400).json({
                error: "Sorry,can't upload this image"
            });
        }
        // add some validation  
        const {name,description,price,category,Quentity,shipping,sold} = fields
        if(!name || !description || !price || !category || !Quentity || !shipping )
        {
            return res.status(400).json({
                error: "All fields are rquired"
            });
        }
        
        let product = new Product(fields);

        if (files.photo)
        {
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.data.contentType = files.photo.type;
        }
        product.save((err,result) =>{
            if(err)
            {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });

};
//update product method
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};
/************************************************************************************* */
// remove product method
exports.remove = (req,res) =>{
    let product = req.product ; 
    product.remove((err,deletedProduct) => {
        if(err)
        {
            return res.status(400).json({
            error : errorHandler(err)
            });
        }
       return  res.json({Message : "Product deleted successfully"})
    });

};



/******************************************
 * creat a middleware productById
 *******************************************/
exports.productById = (req,res,next,id) => {

    Product.findById(id)
    .populate("category")
    .exec((err,product) =>{
        if(!product || err)
        {
            res.status(400).json({
                error: "This product dose not exist"
            });
        }
        req.product = product; 
        
        next();
    });

}
/******************************************************
 * creat list product method 
 * this method will help us in list all products 
 * sell = /products?sortBy=sold&order=des&limit=4
 * arrival = /products?sortBy=createdAt&order=des&limit=4
 * if no params are not send,   then all products are returned 
 ********************************************************/
exports.list = (req,res)=>{
    let sortBy = req.query.sortBy? req.query.sortBy : '_id'
    let order = req.query.order ?  req.query.order : 'asc'
    let limit = req.query.limit ?  parseInt(req.query.limit) : 2
      Product.find() //to get all products
    .select("-photo") // to reject photos data 
    .populate("category") //to replace id with category name 
    .sort([[sortBy,order]])
    .limit(limit)
    .exec((err,data) =>{

        if (err || !data )
        {
            return res.status(400).json({
                error : "Products not found"
            });
        }
        return res.send(data);
    });
};
/****************************************************************
 * creat a method which lists the products based on categorys 
 * 
 ****************************************************************/
exports.listRelated = (req,res) =>{
let limit = req.query.limit ? req.query.limit : 6 ;
Product.find({_id : {$ne : req.product},category: req.product.category})//find All products based on the same category
.select("-photo")
.limit(limit)
.populate("category", 'name')
.exec((err,products) => {
    
    if (err || !products )
    {
        return res.status(400).json({
            Error : "Products not found"
        });
    }
    res.json(products);

});

};
/*****************************************************************
 * creat method to list Categories of products 
 */
exports.listCategories = (req,res) => {
    Product.distinct('category',{},(err,category)=> {
        if(!category || err)
        {
            return res.status(400).json({
                Error: "This product dose not exist"
            });
        }
        res.send(category);

    });
} 

/***********************************************************************
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 *********************************************************************************/

 exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
    //console.log(order, sortBy, limit, skip, req.body.filter);
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                console.log(req.body.filters[key]);
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};
/******************************************************************
 * creat a method to send photo of product 
 ******************************************************************/
exports.photo = (req,res,next) => {
if(req.product.photo.data)
{
    res.set("Content-Type",req.product.photo.contentType);
    return res.send(req.product.photo.data);
    next();
}  
}
exports.listSearch = (req,res) => {
    const query = {}
    if(req.query.search)
    {
        query.name = {$regex: req.query.search,$options: 'i'}
        if(req.query.category && req.query.category != 'All')
        {
            query.category = req.query.category
        }
        console.log(query.name)
        Product.find(query)
        .select('-photo')
        .exec((err,products) => {
    
            if (err || !products )
            {
                return res.status(400).json({
                    Error : "Products not found"
                });
            }
            res.json(products);
        
        })
    }

}
exports.read = (req,res) => 
{
    req.product.photo = undefined
    return res.json(req.product)
}


exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { Quentity: -item.count, sold: +item.count } }
            }
        };
    });

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: "Could not update product"
            });
        }
        next();
    });
};