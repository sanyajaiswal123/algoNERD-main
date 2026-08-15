import { body } from "express-validator";

export const updateProgressValidation = [
  body("completedQuestions")
    .optional()
    .isArray()
    .withMessage("completedQuestions must be an array of question IDs"),
  body("completedQuestions.*")
    .optional()
    .isNumeric()
    .withMessage("Each question ID must be a number"),
  body("completedTopics")
    .optional()
    .isArray()
    .withMessage("completedTopics must be an array of topic strings"),
  body("completedTopics.*")
    .optional()
    .isString()
    .withMessage("Each topic must be a string"),
];
