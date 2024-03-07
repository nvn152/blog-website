import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment?.text);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/getuser/${comment.userId}`);
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = async () => {
    setIsEditing(true);
    setEditedComment(comment.text);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comments/editcomment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId: comment._id,
          text: editedComment,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsEditing(false);

        onEdit(comment, editedComment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex p-4 border dark:border-gray-700 rounded-md text-xs">
      <div className="flex shrink-0 mr-2">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="h-10 w-10 rounded-full bg-gray-300"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "User not found"}
          </span>
          <span className="text-gray-600 text-xs">
            {moment(comment?.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <textarea
              className="border border-gray-400 rounded-md p-2 resize-y h-auto w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your text (Max 200 characters)"
              maxLength="200"
              onChange={(e) => setEditedComment(e.target.value)}
              value={editedComment}
            />
            <div className="flex gap-2 justify-end ">
              <button
                className="bg-cyan-400 p-2 rounded-lg text-gray-700 text-base font-medium  hover:bg-cyan-500"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="bg-red-400 p-2 rounded-lg text-gray-700 font-medium  hover:bg-red-500"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 text-base mb-2">{comment?.text}</p>
            <div className="flex items-center gap-2">
              <button
                className={` hover:text-cyan-500 ${
                  currentUser && comment?.likes.includes(currentUser?._id)
                    ? "text-cyan-500"
                    : "text-gray-400"
                }`}
                onClick={() => onLike(comment?._id)}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-600 text-xs">
                {comment?.numberOfLikes > 0 &&
                  `${comment?.numberOfLikes} ${
                    comment?.numberOfLikes === 1 ? "like" : "likes"
                  }`}
              </p>
              {currentUser &&
                (currentUser?._id === comment?.userId ||
                  currentUser.isAdmin) && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-cyan-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(comment?._id)}
                      className="text-red-400 hover:text-cyan-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
