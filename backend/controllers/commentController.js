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

async function getComments(req, res, next) {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId: postId }).sort({
      createdAt: -1,
    });
    if (!comments) {
      return res.status(404).json({
        success: false,
        message: "No comments found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    next(error);
  }
}

async function likeComment(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    const userIndex = comment.likes.findIndex(
      (userId) => userId === req.user.id
    );

    if (userIndex !== -1) {
      comment.likes.splice(userIndex, 1);
      comment.numberOfLikes -= 1;
      comment.numberOfdislikes += 1;
    } else {
      comment.likes.push(req.user.id);
      comment.numberOfLikes += 1;
      comment.numberOfdislikes -= 1;
    }

    await comment.save();
    return res.status(200).json({
      success: true,
      message: "Comment liked successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
}

export { createComment, getComments, likeComment };
