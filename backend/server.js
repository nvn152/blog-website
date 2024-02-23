import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnection.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/postRoute.js";

dotenv.config();
const port = process.env.PORT || 5000;

console.log(process.env.MONGO_URI);

connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});
