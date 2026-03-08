import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

const uploadUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    const isUsername = await User.findOne({ username: username });
    const isEmail = await User.findOne({ email: email });
    if (isUsername) {
      return res
        .status(400)
        .json({ message: `user with username ${username} already exists` });
    }

    if (isEmail) {
      return res.status(400).json({ message: `email ${email} already exists` });
    }
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export default uploadUser;
