import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    completedQuestions: {
      type: [Number],
      default: [],
    },
    completedTopics: {
      type: [String],
      default: [],
    },
    totalSolved: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate totalSolved before save
progressSchema.pre("save", function (next) {
  if (Array.isArray(this.completedQuestions)) {
    this.totalSolved = this.completedQuestions.length;
  }
  next();
});

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
