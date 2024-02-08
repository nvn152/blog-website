import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnection.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});
