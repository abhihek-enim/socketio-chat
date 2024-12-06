import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const options = {
  httpOnly: true,
  secure: true,
};
const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    await user.save({ validateBeforeSave: false });
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "All fields are required."));
    }
    const isAlreadyUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (isAlreadyUser) {
      return res
        .status(409)
        .json(new ApiResponse(409, {}, "User already exists."));
    }

    const user = await User.create({
      username,
      email,
      password,
    });
    const token = await generateAccessToken(user._id);
    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Internal Server Error"));
    }

    return res
      .status(200)
      .cookie("token", token, options)
      .json(new ApiResponse(200, { user: createdUser, token }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, {}, "Err:Register User"));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Email/Password is required."));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "User doesn't exist."));
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Email/Password incorrect."));
    }
    const token = await generateAccessToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password");
    return res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, token },
          "User data fetched successfully. "
        )
      );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Something went wrong while login."));
  }
};
export const getUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json(new ApiResponse(400, {}, "Email is required."));
  }
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "User does not exist."));
  }
  return res.status(200).json(new ApiResponse(200, user, "User fetched"));
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { username, bio } = req.body;
    if (!username || !bio) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Fields are required"));
    }

    const profileImageLocalPath = req.files?.profilePicture?.[0]?.path;
    let profileImage = req.user?.profilePicture || "";
    if (!req.user?.profilePicture && !profileImageLocalPath) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Profile Image is required"));
    }

    if (profileImageLocalPath) {
      profileImage = await uploadOnCloudinary(profileImageLocalPath);

      if (!profileImage) {
        return res
          .status(500)
          .json(new ApiResponse(500, {}, "Server error during image upload."));
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { username, bio: bio, profilePicture: profileImage.url },
      },
      {
        new: true,
      }
    ).select("-password");
    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile updated successfully"));
  } catch (error) {
    console.log(error);
  }
};
export const searchUsers = async (req, res, next) => {
  const { searchQuery } = req.body;

  if (!searchQuery) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Search query is required."));
  }

  try {
    const users = await User.find({
      $or: [
        { email: { $regex: searchQuery, $options: "i" } },
        { username: { $regex: searchQuery, $options: "i" } },
      ],
    }).select("-password");

    if (!users.length) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "No users match your search."));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched successfully."));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "An error occurred during search."));
  }
};
