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

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      newPost: savedPost,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const getPosts = expressAsyncHandler(async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Building the query conditions dynamically
    const queryConditions = {};
    if (req.query.userId) queryConditions.userId = req.query.userId;
    if (req.query.category) queryConditions.category = req.query.category;
    if (req.query.slug) queryConditions.slug = req.query.slug;
    if (req.query.postId) queryConditions._id = req.query.postId;
    if (req.query.searchTerm) {
      queryConditions.$or = [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { content: { $regex: req.query.searchTerm, $options: "i" } },
      ];
    }

    const posts = await Post.find(queryConditions)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAge = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const postsInLastMonth = await Post.countDocuments({
      createdAt: { $gte: oneMonthAge },
    });

    res.status(200).json({
      success: true,
      posts,
      totalPosts,
      postsInLastMonth,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const deletePost = expressAsyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(error(400, "You are not allowed to delete a post", res));
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

export { getPosts, createPost, deletePost };
