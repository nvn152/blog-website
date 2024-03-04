import Comment from "../models/commentModel.js";

async function createComment(req, res, next) {
  try {
    const { text, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }

    const newComment = new Comment({
      text,
      postId,
      userId,
    });
    await newComment.save();
    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
}

export { createComment };
