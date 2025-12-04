const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  static async registerUser(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = new UserModel({ email, password: hashedPassword });
      return createUser.save();
    } catch (err) {
      throw err;
    }
  }

  static async checkuser(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      throw err;
    }
  }

  static async generateToken(tokenData, secretKey, jwt_expiry) {
    return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expiry });
  }
}
module.exports = UserService;
