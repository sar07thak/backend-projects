const { validateToken } = require("../utils/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next(); // no token, continue unauthenticated
    }

    try {
      const payload = validateToken(tokenCookieValue);
      req.user = payload; // ✅ attach user data to request
    } catch (err) {
      console.log("Invalid token");
    }

    next(); // continue either way (but with or without req.user)
  };
}


module.exports = {
    checkForAuthenticationCookie 
}