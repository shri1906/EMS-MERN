import jwt from "jsonwebtoken"
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.autherization.split("")[1];
    if(!token){
        return res.status(404).json({success: false, error: 'Token not provided!'})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    if(!decoded){
        return res.status(404).json({success: false, error: 'Token invalid!'})
    }
    const user = await User.findById({_id: decoded._id}).select('-password')
    if(!user){
        return res.status(404).json({success: false, error: 'User not found!'})
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({success: false, error: 'Internal Server Error!'})
  }
};

export default verifyUser;