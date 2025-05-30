const { Schema, model } = require("mongoose") ;
const bcrypt = require("bcrypt");


const userSchema = new Schema({
    fullName : {
        type : String ,
        required : true 
    }, 
    email : {
        type : String ,
        required : true 
    } ,
    password : {
        type : String ,
        required : true 
    } ,
    isAdmin : {
        type : Boolean
    } ,
    cart : {
        type : Array ,
        default : [ ]
    } ,
    contact : {
        type : Number ,
    } ,
    picture : {
        type : String 
    } , 
    order : {
        type : Array ,
        default : [ ]
    } 
} , {timestamps : true })

userSchema.methods.verifyUser = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const User = model("User" , userSchema );
module.exports = User ;


