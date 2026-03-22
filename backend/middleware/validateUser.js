import User from "../models/userSchema.js";

const validateSignup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ field: "all", message: "required field cannot be empty" });
  }
  const emailRegex =
    /^(?!.*\.\.)(?!.*\s)[a-z0-9]+(\.[a-z0-9]+)*@[a-z]+\.[a-z]{2,4}$/;

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ field: "email", message: "Invalid email format" });
  }

  const isUsername = await User.findOne({ username: username });
  const isEmail = await User.findOne({ email: email });
  if (isUsername) {
    return res.status(400).json({
      field: "username",
      message: `user with username ${username} already exists`,
    });
  }

  if (isEmail) {
    return res
      .status(400)
      .json({ field: "email", message: `email ${email} already exists` });
  }
  if (password.length <= 3) {
    return res.status(400).json({
      field: "password",
      message: "password must atleast contain 4 characters",
    });
  }
  next();
};



export { validateSignup };
