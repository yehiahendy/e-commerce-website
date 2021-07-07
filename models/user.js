/*********************************************
 * mongoos =========> database
 * crypto ==========> cryptographic 
 * uuidv1 ==========> for unique string/id 
 */
const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1: uuidv1} = require('uuid');
const userSchema = new mongoose.Schema({
    name : 
    {
        type : String,
        trim : true,
        maxlength: 32,
        required: true
    },
    email : 
    {
        type : String,
        trim : true,
        maxlength: 32,
        required: true,
        unique : true 
    },
    hashed_password : 
    {
        type : String,
        required: true

    },
    about : 
    {
        type : String,
        maxlength: 32,
       // required: true,
    },
    salt : String,
    role : 
    {
        type : Number,
        default : 0

    },
    history:
    {
        type : Array,
        default: []

    }
},{timestamps : true});
userSchema.virtual('password').set(function (password)
{
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
})
.get(function ()
{
    return this._password

});

userSchema.methods = {
    
    authorization: function(plainText)
    {
        return this.encryptPassword(plainText) === this.hashed_password
    }
    
    
    
    
    
    ,encryptPassword: function(password)
    {
        if(!password) return '';
        try {
            return crypto
            .createHmac("sha1",this.salt)
            .update(password)
            .digest('hex');
        } catch (error) {
            console.log(error);
            return "";
            
        }


    }

};
module.exports = mongoose.model("user",userSchema);