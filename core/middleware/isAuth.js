const jwt = require("jsonwebtoken");
const sinfoConfig = require("../config/site.config.json");

module.exports = (req, res, next) => {
  try {
    // get token from headers
    const AuthToken = req.get("Authorization");

    if (typeof AuthToken === "undefined") {
      throw new Error("Invalid Auth Token");
    }
    const token = AuthToken.split(" ")[1];

    const DecryptToken = jwt.verify(token, sinfoConfig.JWT_SECRET_TOKEN);
    req.body.loggedUserId = DecryptToken._id;
    req.body.loggedUserEmail = DecryptToken.email;
    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
