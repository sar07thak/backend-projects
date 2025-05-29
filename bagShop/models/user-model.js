const { Schema, model } = require("mongoose") ;

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
        required : true
    } ,
    picture : {
        type : String 
    } , 
    order : {
        type : Array ,
        default : [ ]
    } 
} , {timestamps : true })


const User = model("User" , userSchema );
module.exports = User ;


