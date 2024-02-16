import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: [true, "Username already exists!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email already exists!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  profilePicture: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
