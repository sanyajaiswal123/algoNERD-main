import {
  registerUserService,
  loginUserService,
  getUserProfileService,
} from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateToken, clearTokenCookie } from "../utils/generateToken.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUserService({ name, email, password });
    const token = generateToken(res, user._id);

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { user, token },
          "User registered successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUserService({ email, password });
    const token = generateToken(res, user._id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, { user, token }, "User logged in successfully")
      );
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    clearTokenCookie(res);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "User logged out successfully"));
  } catch (error) {
    next(error);
  }
};

export const getMeController = async (req, res, next) => {
  try {
    const user = await getUserProfileService(req.user._id);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          user,
          "Current user profile retrieved successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};
