const { Schema, model } = require("mongoose") ;

const ownerSchema = new Schema({
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
    contact : {
        type : Number ,
    } ,
    picture : {
        type : String 
    } , 
    Product : {
        type : Array ,
        default : [ ]
    } 
} , {timestamps : true })


const Owner = model("Owner" , ownerSchema );
module.exports = Owner ;


