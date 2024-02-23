import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    content: {
      type: String,
      required: [true, "Content is required!"],
    },
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQabUfxBIMpezSr8CgSlqiK1NLHGpBnHQwf1eWgj1cvqTEc9nnmXDZkOqrvtbWEZoTUDnw&usqp=CAU",
    },

    category: {
      type: String,
      default: "uncategorized",
    },

    slug: {
      type: String,
      required: [true, "Slug is required!"],
      unique: [true, "Slug already exists!"],
    },
    userId: {
      type: String,
      required: [true, "User ID is required!"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
