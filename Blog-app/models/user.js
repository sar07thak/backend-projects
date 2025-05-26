const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    fullName : {
        type : String ,
        required : true
    },
    lastName : {
        type : String , 
    },
    email : {
        type : String ,
        required : true ,
        unique : true 
    },
    password : {
        type : String ,
        required : true ,
        unique : true 
    },
    profileImageUrl : {
        type : String ,
        default : "/default.png",
    },
    role : {
        type : String ,
        enum : [ "USER" , "ADMIN" ] ,
        default : "USER"
    }
},{timestamps : true})


// userSchema.pre("save", async function(next) {
//     if (!this.isModified("password")) return next(); // Only hash if password is modified or new
    
//     try {
//         const saltRounds = 10;
//         this.password = await bcrypt.hash(this.password, saltRounds);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });

userSchema.methods.verifyUser = function (plainPassword) {
    const ans =  bcrypt.compare(plainPassword, this.password);
    return ans ; 
};

const user = mongoose.model("user" , userSchema ) ;

module.exports = user ;