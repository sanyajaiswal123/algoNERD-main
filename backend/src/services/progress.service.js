import Progress from "../models/Progress.js";
import ApiError from "../utils/ApiError.js";

export const getUserProgressService = async (userId) => {
  let progress = await Progress.findOne({ userId });

  if (!progress) {
    progress = await Progress.create({
      userId,
      completedQuestions: [],
      completedTopics: [],
      totalSolved: 0,
    });
  }

  return progress;
};

export const updateUserProgressService = async (
  userId,
  { completedQuestions, completedTopics }
) => {
  let progress = await Progress.findOne({ userId });

  if (!progress) {
    progress = new Progress({ userId });
  }

  if (Array.isArray(completedQuestions)) {
    progress.completedQuestions = completedQuestions;
  }

  if (Array.isArray(completedTopics)) {
    progress.completedTopics = completedTopics;
  }

  await progress.save();
  return progress;
};
