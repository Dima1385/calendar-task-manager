import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import taskRoutes from "./routes/tasks.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/calendar-task-manager";

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
