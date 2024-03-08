import { Card, Typography, button } from "@material-tailwind/react";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button as FlowbiteButton, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

function AllComments() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/getallcomments`);
        const data = await res.json();

        if (data.success) {
          setComments(data.data.comments);
          if (data.data.comments.length < 10) {
            setShowMore(false);
          }
        } else {
          console.log("Could not fetch Comments");
          toast.error("Could not fetch Comments");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const TABLE_HEAD = [
    "DATE UPDATED",
    "COMMENT",
    "LIKES",
    "POST ID",
    "USER ID",
    "DELETE",
  ];

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comments/getposts?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (data.success) {
        setComments((prevState) => [...prevState, ...data.comments]);
        if (data.comments.length < 10) {
          setShowMore(false);
        }
      } else {
        console.log("Could not fetch comments");
        toast.error("Could not fetch comments");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `/api/comments/deletecomment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success) {
        setComments(
          comments.filter((comment) => comment._id !== commentIdToDelete)
        );
        showModal(false);
        toast.success("comment deleted successfully");
      } else {
        toast.error("Could not delete comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full  my-2 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-thumb-blue-500 scrollbar-track-blue-200 no-scrollbar overflow-auto">
      {currentUser.isAdmin && comments?.length > 0 ? (
        <Card className="h-full w-full overflow-scroll my-2">
          <table className="w-full min-w-max table-auto text-left bg-gray-100 dark:bg-black/90 text-gray-900 dark:text-gray-100">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold text-base leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comments.map(
                (
                  {
                    createdAt,

                    _id,
                    text,
                    email,
                    postId,
                    userId,
                    profilePicture,
                    numberOfLikes,
                  },
                  index
                ) => (
                  <tr key={_id} className="even:bg-blue-gray-50/50">
                    <td className="p-4 w-36">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(createdAt).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className="p-4 w-10">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal truncate w-52"
                      >
                        {text}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium text-lg truncate w-fit overflow-hidden line-clamp-2"
                      >
                        {numberOfLikes}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {postId}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {userId}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      ></Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium text-red-500"
                      >
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setCommentIdToDelete(_id);
                          }}
                        >
                          Delete
                        </span>
                      </Typography>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {showMore && (
            <button
              className="w-full text-gray-700 dark:bg-black/90 dark:text-blue-400"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </Card>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-bold">No comments</p>
        </div>
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
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <FlowbiteButton
                color="failure"
                onClick={() => {
                  setShowModal(false);
                  handleDeleteComment();
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

export default AllComments;
