import User from "../models/userSchema.js";

const uploadUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export default uploadUser;
