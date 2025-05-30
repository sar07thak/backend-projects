const validator = require("validator");


const validateAdmin = (data) => {

    const checkEmail = validator.isEmail(data.email);
    if(!checkEmail) throw new Error("invalid credential");

    const checkPass = validator.isStrongPassword(data.password);
    if(!checkPass) throw new Error("create a strong password :-)");
}

module.exports = validateAdmin ;