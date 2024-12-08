import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiResponse } from "../utils/ApiResponse.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(409)
        .json(new ApiResponse(409, {}, "Unauthorized request"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");
    if (!user) {
      return res.status(409).json(new ApiResponse(409, {}, "Invalid Token"));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(new ApiResponse(400, {}, "Login Again"));
  }
};
