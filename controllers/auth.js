import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// Regist
export const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

// Login
export const login = async (req, res, next) => {

  let { email, password } = req.body;

  try {
    email = email.toLowerCase();
    const user = await User.findOne({ email: email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Email or Password is invalid" });
    }

    const token = generateToken(user._id);

    res.json({ token });

  } catch (error) {
    next(error);
  }
};
