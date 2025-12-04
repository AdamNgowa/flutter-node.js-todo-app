const UserService = require("../services/user.services");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const successRes = await UserService.registerUser(email, password);
    res.json({ status: true, success: "User registerd successfully" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.checkuser(email);
    if (!user) {
      throw new Error("User doesn't exist");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid password");

    let tokenData = { _id: user._id, email: user.email };
    let token = await UserService.generateToken(tokenData, "secretKey", "1h");
    res.status(200).json({ status: true, token: token });
  } catch (err) {
    next(err);
  }
};
