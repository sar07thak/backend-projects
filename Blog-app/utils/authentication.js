const jwt = require("jsonwebtoken");

function createToken(user) {
  const payload = {
    fullName: user.fullName,
    _id: user.id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.Secret_Key);
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, process.env.Secret_Key);
  return payload;
}

module.exports = {
  createToken,
  validateToken,
};
