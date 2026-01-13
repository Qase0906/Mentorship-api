import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not provided token" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // add current user info to (req) to have access it everywhere
    req.user = await User.findById(decode.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or Expired token" });
  }
};
