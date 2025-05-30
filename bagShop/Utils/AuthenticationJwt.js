const jwt = require("jsonwebtoken");

const tokenCreation = (user) => {
    const payload = {
        fullName: user.fullName,
        _id: user.id,
        email: user.email        
    };

    const token = jwt.sign(payload , process.env.SECRET_KEY );
    return token 
}




module.exports = {
    tokenCreation ,
}