import expressAsyncHandler from "express-async-handler";
import { error } from "../utils/error.js";
import Post from "../models/PostModel.js";

const createPost = expressAsyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(error(400, "You are not allowed to create a post", res));
  }

  if (!req.body.title || !req.body.content) {
    return next(error(400, "Please provide all the required fields!!", res));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const post = new Post({
    ...req.body,
    slug,
    user: req.user._id,
  });

  try {
    const savedPost = await post.save();
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    next(error);
  }
});

export default createPost;
