const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs  = require('fs');
const {errorHandler} = require('../helpers/dbErrorHandler');
const product = require('../models/product');
//creat product method
exports.creat = (req,res) => {
    const product = new Product(req.body);
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    consle.log("AA");
    form.parse(req,(err,fields,files) => {
        if(err)
        {
            return res.status(400).json({
            Error: "image can't be uploaded"
            });
        }
        // make constrains to file size
        //maximum file size = 1000000 =====> 1 mb 
        if (files.photo.size > 1000000)
        {
            return res.status(400).json({
                Error: "Sorry,can't upload this image"
            });
        }
        // add some validation  
        const {name,description,price,category,Quentity,shipping} = fields
        if(!name || !description || !price || !category || !Quentity || !shipping )
        {
            return res.status(400).json({
                Error: "All fields are rquired"
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
                    Error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });

};
//update product method
exports.update = (req,res) => {
    //const product = new Product(req.body);
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files) => {
        if(err)
        {
            return res.status(400).json({
            Error: "image can't be uploaded"
            });
        }
        // make constrains to file size
        //maximum file size = 1000000 =====> 1 mb 
        if (files.photo.size > 1000000)
        {
            return res.status(400).json({
                Error: "Sorry,can't upload this image"
            }); 
        }
        // add some validation  
        const {name,description,price,category,Quentity,shipping} = fields
        if(!name || !description || !price || !category || !Quentity || !shipping )
        {
            return res.status(400).json({
                Error: "All fields are rquired"
            });
        }
        
        let product = req.product;
        product = _.extend(product,fields);

        if (files.photo)
        {
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.data.contentType = files.photo.type;
        }
        product.save((err,result) =>{
            if(err)
            {
                return res.status(400).json({
                    Error: errorHandler(err)
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
            Error : errorHandler(err)
            });
        }
        res.json({Message : "Product deleted successfully"})
    });

};



/******************************************
 * creat a middleware productById
 *******************************************/
exports.productById = (req,res,next,id) => {

    Product.findById(id).exec((err,product) =>{
        if(!product || err)
        {
            return res.status(400).json({
                Error: "This product dose not exist"
            });
        }
        req.product = product; 
        next();
    });

}