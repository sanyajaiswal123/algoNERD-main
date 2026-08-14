import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database and start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(
      `[algoNERD Server] Running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}`
    );
  });
};

startServer();
