import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { Button as FlowbiteButton, Modal } from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/comments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          text: comment,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setComment("");
        setComments([data?.data, ...comments]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comments/getcomments/${postId}`);
        const data = await res.json();

        if (data.success) {
          setComments(data.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        toast.error("Please sign in to like");
        navigate("/signin");
        return;
      }

      const res = await fetch(`/api/comments/likecomment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data?.data.likes,
                  numberOfLikes: data?.data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (comment, editedComment) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, text: editedComment } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    try {
      if (!currentUser) {
        toast.error("Please sign in to delete");
        navigate("/signin");
        return;
      }

      const res = await fetch(`/api/comments/deletecomment/${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-base">
          <p> Comment as {currentUser.username}</p>
          <img
            className="h-8 w-8 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="profile"
          />
          <Link
            to={`/dashboard/?tab=profile`}
            className="text-base text-blue-600 hover:underline font-bold"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-base">
          <p>Please sign in to comment</p>
          <Link
            className="text-blue-500 font-semibold hover:underline "
            to={`/auth/sign-in`}
          >
            Sign in
          </Link>
        </div>
      )}
      <div className="flex flex-col gap-5">
        {currentUser && (
          <form
            className="flex flex-col gap-2 border border-gray-500 rounded-md p-2"
            onSubmit={handleSubmit}
          >
            <textarea
              className="border border-gray-400 rounded-md p-2 resize-y h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your text (Max 200 characters)"
              maxLength="200"
              rows="3"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              onSubmit={handleSubmit}
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-green-500 text-xs">
                {200 - comment.length} characters remaning
              </p>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded-md"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        )}
      </div>
      {comments?.length === 0 ? (
        <p className="text-gray-500 text-center">No comments yet</p>
      ) : (
        <>
          <div className=" my-5 flex items-center gap-1 text-gray-500 text-base">
            <p>Comments</p>
            <div className="border border-gray-300 rounded-md p-2 ">
              <p>{comments?.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment?._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);

                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center bg-white dark:bg-gray-800 p-5 rounded-lg">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your comment?
            </h3>
            <div className="flex justify-center gap-4">
              <FlowbiteButton
                color="failure"
                onClick={() => {
                  handleDelete(commentToDelete);
                  setShowModal(false);
                }}
              >
                {"Yes, I'm sure"}
              </FlowbiteButton>
              <FlowbiteButton color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </FlowbiteButton>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default CommentSection;
