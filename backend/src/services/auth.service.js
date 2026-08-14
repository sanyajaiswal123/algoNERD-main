import User from "../models/User.js";
import Progress from "../models/Progress.js";
import ApiError from "../utils/ApiError.js";

export const registerUserService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email address");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  // Create initial empty Progress document for user
  await Progress.create({
    userId: user._id,
    completedQuestions: [],
    completedTopics: [],
    totalSolved: 0,
  });

  // Return user without password
  const userResponse = await User.findById(user._id).select("-password");

  return userResponse;
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const userResponse = await User.findById(user._id).select("-password");
  return userResponse;
};

export const getUserProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new ApiError(404, "User profile not found");
  }
  return user;
};
