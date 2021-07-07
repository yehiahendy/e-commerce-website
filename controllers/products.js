const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs  = require('fs');
const {errorHandler} = require('../helpers/dbErrorHandler');
exports.creat = (req,res) => {
    const product = new Product(req.body);
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    console.log("aaaa");
    form.parse(req,(err,fields,files) => {
        if(err)
        {
            return res.status(400).json({
            Error: "image can't be uploaded"
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