import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "MongoDB Connected: ",
      conn.connection.host,
      conn.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export { connectDB };
