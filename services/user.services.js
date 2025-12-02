const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

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
}
module.exports = UserService;
