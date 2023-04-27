const UserModel = require("../models/UserSchema");

async function isUserExist(email) {
  const CheckUser = await UserModel.findOne({ email });
  console.log(CheckUser);
  if (CheckUser) {
    return true;
  } else {
    return false;
  }
}
module.exports = isUserExist;
