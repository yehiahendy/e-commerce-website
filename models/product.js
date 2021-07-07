//import the mongoose 
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name :
    {
        type :String,
        required: true,
        maxLength: 32,
        trim: true
    },
    description :
    {
        type :String,
        required: true,
        maxLength: 32,
        trim: true
    },
    price :
    {
        type :Number,
        required: true,
        trim: true
    },
    category :
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
        maxLength : 32
    },
    Quentity :
    {
        type : Number,
        required: true
    },
    photo :
    {
        data : Buffer,
        contentType : String
    },
    shipping :
    {
        requored : false,
        type : Boolean
    }

},{timestamps : true});
module.exports = mongoose.model("Product",productSchema);