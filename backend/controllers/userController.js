import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ field: "server", message: "server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { usernameORemail, password } = req.body;

    if (!usernameORemail || !password) {
      return res.status(400).json({
        field: "usernameORemail & password",
        message: "required fields cannot be empty",
      });
    }

    const user = await User.findOne({
      $or: [{ username: usernameORemail }, { email: usernameORemail }],
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        field: "usernameORemail",
        message: "invalid username or email",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(400)
        .json({ field: "password", message: "incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ field: "server", message: "server error" });
  }
};
const getUser = async (req, res) => {
  
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
   
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ field: "server", message: "server error" });
  }
};
export { signUp, Login, getUser };
