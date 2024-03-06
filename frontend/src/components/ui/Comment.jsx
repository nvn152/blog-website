import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});

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
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-600 text-base mb-2">{comment.text}</p>
        <div className="flex items-center gap-2">
          <button
            className={` hover:text-cyan-500 ${
              currentUser && comment?.likes.includes(currentUser?._id)
                ? "text-cyan-500"
                : "text-gray-400"
            }`}
            onClick={() => onLike(comment._id)}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-600 text-xs">
            {comment.numberOfLikes > 0 &&
              `${comment.numberOfLikes} ${
                comment.numberOfLikes === 1 ? "like" : "likes"
              }`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
