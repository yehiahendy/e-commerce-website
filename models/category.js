//import the mongoose 
const mongoose = require('mongoose');
//creat categoryschema
const categorySchema = new mongoose.Schema({
    name :
    {
        type : String,
        trim : true,
        maxlength: 32,
        required: true
    }
});
//export the modle
module.exports = mongoose.model("category",categorySchema);