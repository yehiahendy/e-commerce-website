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
        ref: 'category',
        maxLength : 32
    },
    Quentity :
    {
        type : Number,
        required: true
    },
    sold :
    {
        type : Number,
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