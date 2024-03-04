import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

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
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
    </div>
  );
}
export default CommentSection;
