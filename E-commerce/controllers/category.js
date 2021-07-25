const Category = require('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler')
/*************************************************************************** */
exports.creat = (req,res) => 
{
const category = new Category(req.body);
category.save((error,data) => 
{   
if (error)
{
return res.status(400).json({
error : errorHandler(error)
});
}

res.json({data});
});

};

/******************************************************************** */
exports.read = (req,res) =>{
    res.json(res.category );
    };
/******************************************************************* */
exports.update = (req,res) => {
const category =  req.category
category.name = req.body.name
category.save((err,data) => {
if(err || !data)
{
return res.status(400).json({
Error: "Updata faild"
});
}
res.json(data);
});
};
/***************************************************************** */
exports.remove = (req,res) => {
    const category = req.category
    category.remove((err,deletedCategory) =>{
        if(err || !deletedCategory)
        {
            return res.status(400).json({
                Error : "Faild"
            });
        }
        res.json({Message: "Category deleted successfully"});
    });
};
/****************************************************************** */
exports.list = (req,res) => {
    Category.find().exec((err,data) => {
        if(err || !data)
        {
            return res.status(400).json({
                Error: "Sorry, there's error"
            });
        }
        res.json(data);
    });
};
/***************************************************************** */
exports.categoryById = (req,res,next,id) => {
Category.findById(id).exec((err,category) => {
    if(err || !category)
    {
        return res.status(400).json({
            Error: "Category dose not exist"
        });
    }
    req.category = category;
    next();
});
};
/*************************************************************** */
