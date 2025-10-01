import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app: Application = express();
const PORT = Number(process.env.PORT) || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Digital ID Backend is running 🚀");
});

// 👇 Mount auth routes under /api/auth
app.use("/api/auth", authRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
