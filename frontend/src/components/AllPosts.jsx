import { Card, Typography, button } from "@material-tailwind/react";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AllPosts() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/posts/getposts?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (data.success) {
          setUserPosts(data.posts);
          if (data.posts.length < 10) {
            setShowMore(false);
          }
        } else {
          console.log("Could not fetch posts");
          toast.error("Could not fetch posts");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const TABLE_HEAD = [
    "DATE UPDATED",
    "POST IMAGE",
    "POST TITLE",
    "CATEGORY",
    "DELETE",
    "EDIT",
  ];

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/posts/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (data.success) {
        setUserPosts((prevState) => [...prevState, ...data.posts]);
        if (data.posts.length < 10) {
          setShowMore(false);
        }
      } else {
        console.log("Could not fetch posts");
        toast.error("Could not fetch posts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full  my-2 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-thumb-blue-500 scrollbar-track-blue-200 no-scrollbar overflow-auto">
      {currentUser.isAdmin && userPosts.length > 0 ? (
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
              {userPosts.map(
                (
                  {
                    category,
                    content,
                    createdAt,
                    image,
                    slug,
                    title,
                    updatedAt,
                    userId,
                    _id,
                  },
                  index
                ) => (
                  <tr key={updatedAt} className="even:bg-blue-gray-50/50">
                    <td className="p-4 w-36">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(updatedAt).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className="p-4 w-24">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal truncate w-52"
                      >
                        <Link to={`/posts/${slug}`}>
                          <img
                            src={image}
                            alt="post image"
                            className="h-24 w-24 object-cover"
                          />
                        </Link>
                      </Typography>
                    </td>
                    <td className="p-4 w-[600px]">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium text-lg w-[600px]  overflow-hidden line-clamp-2"
                      >
                        <Link to={`/posts/${slug}`}>{title}</Link>
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
                        {category}
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
                        <span>Delete</span>
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
                        <Link to={`/posts/edit/${_id}`}>Edit</Link>
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
          <p className="text-xl font-bold">No Posts</p>
        </div>
      )}
    </div>
  );
}

export default AllPosts;
