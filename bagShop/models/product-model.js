const { Schema, model } = require("mongoose") ;

const productSchema = new Schema({
    productName : {
        type : String ,
        required : true 
    }, 
    image : {
        type : String ,
    } ,
    bgColor : {
        type : String ,
        required : true 
    } ,
    discount : {
        type : Number ,
        default : 0 
    } ,
    price : {
        type : Number ,
        required : true
    } ,
    picture : {
        type : String 
    } , 
    panelColor : {
        type : String ,
    } , 
    textColor : {
        type : String ,
    } 
} , {timestamps : true })


const Product = model("Product" , productSchema );
module.exports = Product ;


