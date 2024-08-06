eimport express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

app.use(cors({
  origin: 'https://note-app-frontend-alpha.vercel.app', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch(() => {
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());

//import routes
import noteRouter from "./routes/note.route.js";
app.use("/api/note", noteRouter);

app.get('/api/note/all', (req, res) => {
  res.json({ message: 'Notes fetched successfully' }); // Example response
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(5000, (req, res) => {
  console.log("Server is running......");
});
