const jwt = require("jsonwebtoken");
const config = require("../../config/site.config.json");
const bcrypt = require("bcryptjs");
const encrypt = require("../../utils/encryption");

const UserModel = require("../../models/UserSchema");
const isUserExist = require("../../helpers/isUserExist");
class Authentication {
  async Login(req, res) {
    try {
      const User = await UserModel.findOne({ email: req.body.email });
      if (!User) {
        throw new Error("User Doest not exist");
      }
      if (!User.status === "0x0000") {
        throw new Error(
          `This Account is not Activated, Please Contact the administrator`
        );
      }
      const CheckPasswordValidOrNot = await bcrypt.compare(
        req.body.password,
        User.password
      );
      if (!CheckPasswordValidOrNot) throw new Error("Incorrect Password");
      //create new toke and assigning it to the user
      const JWTToken = jwt.sign(
        { _id: User._id, email: User.email, role: User.role },
        config.JWT_SECRET_TOKEN,
        {
          expiresIn: "30d",
        }
      );

      return res
        .cookie("access_token", JWTToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ success: true, message: "Logged in successfully 😊 👌" });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
  async Register(req, res) {
    try {
      let UserData = {};
      const { firstName, lastName, username, email, password, phone } =
        req.body;
      if (!firstName && !username && !email && !password) {
        throw new Error("Some of Required Fields are empty");
      }

      if (await isUserExist(email)) {
        throw new Error("User already registered");
      }
      UserData = {
        firstName,
        username,
        email,
      };
      if (lastName) {
        UserData.lastName = lastName;
      }
      if (phone) {
        UserData.phone = phone;
      }
      const CreatePasswwordSalt = bcrypt.genSaltSync(10);
      const CreateHashedPassword = bcrypt.hashSync(
        password,
        CreatePasswwordSalt
      );

      UserData.password = CreateHashedPassword;

      const CreateNewUser = new UserModel(UserData);
      await CreateNewUser.save();
      res.send({
        success: true,
        message: "User Account Created successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }

  async CheckCurrentUser(req, res) {
    const User = await UserModel.findOne({ email: req.body.email });
    try {
      if (!User) {
        throw new Error("User Doest not exist");
      }
      if (!User.status === "0x0000") {
        throw new Error(
          `This Account is not Activated, Please Contact the administrator`
        );
      }
      const { password, ...rest } = User;
      const EncryptedData = encrypt(rest);
      console.log(EncryptedData);
      return res.send({
        success: true,
        message: EncryptedData,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new Authentication();
