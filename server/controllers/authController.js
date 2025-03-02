import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // If user does not exist, return early
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // If password is incorrect, return early
    if (!isMatch) {
      return res.status(403).json({ success: false, error: "Wrong Password!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "6h" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const verify = async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export { login, verify };
