import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database asynchronously and start server
const startServer = async () => {
  connectDB().catch((err) => {
    console.warn("[MongoDB Warning] Initial database connection error:", err.message);
  });

  app.listen(PORT, () => {
    console.log(
      `[algoNERD Server] Running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}`
    );
  });
};

startServer();
