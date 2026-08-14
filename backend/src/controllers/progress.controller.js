import {
  getUserProgressService,
  updateUserProgressService,
} from "../services/progress.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getProgressController = async (req, res, next) => {
  try {
    const progress = await getUserProgressService(req.user._id);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          progress,
          "User progress retrieved successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

export const updateProgressController = async (req, res, next) => {
  try {
    const { completedQuestions, completedTopics } = req.body;
    const progress = await updateUserProgressService(req.user._id, {
      completedQuestions,
      completedTopics,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          progress,
          "User progress updated successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};
