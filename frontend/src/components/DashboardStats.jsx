import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DashboardStats() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [usersInLastMonth, setUsersInLastMonth] = useState(0);
  const [postsInLastMonth, setPostsInLastMonth] = useState(0);
  const [commentsInLastMonth, setCommentsInLastMonth] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`/api/users/getusers?limit=5`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setUsersInLastMonth(data.usersInLastMonth);
      } else {
        console.log("Could not fetch Users");
        toast.error("Could not fetch Users");
      }
    };
    const fetchPosts = async () => {
      const res = await fetch(`/api/posts/getposts?limit=5`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setPostsInLastMonth(data.postsInLastMonth);
      } else {
        console.log("Could not fetch Posts");
        toast.error("Could not fetch Posts");
      }
    };
    const fetchComments = async () => {
      const res = await fetch(`/api/comments/getallcomments?limit=5`);
      const data = await res.json();
      if (data.success) {
        setComments(data?.data.comments);
        setTotalComments(data?.data?.totalComments);
        setCommentsInLastMonth(data?.data?.commentsInLastMonth);
      } else {
        console.log("Could not fetch Comments");
        toast.error("Could not fetch Comments");
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  console.log(comments);

  return (
    <div className="p-3 md:mx-auto mt-5">
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-[#1E1E1E] gap-4 md:w-[450px] w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-sm uppercase">Total Users</h3>
              <p className="text-3xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-blue-600 text-white rounded-full p-3 shadow-xl text-5xl " />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {usersInLastMonth}
            </span>
            <div className="text-gray-500">Last Months</div>
          </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-[#1E1E1E] gap-4 md:w-[450px] w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-sm uppercase">
                Total Comments
              </h3>
              <p className="text-3xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-blue-600 text-white rounded-full p-3 shadow-xl text-5xl " />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {commentsInLastMonth}
            </span>
            <div className="text-gray-500">Last Months</div>
          </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-[#1E1E1E] gap-4 md:w-[450px] w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-sm uppercase">Total Posts</h3>
              <p className="text-3xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-blue-600 text-white rounded-full p-3 shadow-xl text-5xl " />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {postsInLastMonth}
            </span>
            <div className="text-gray-500">Last Months</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center py-3 mx-auto">
        <div className="flex h-fit flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-[#1E1E1E]">
          <div className="flex justify-between p3  text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>

            <Button className="" color="blue" outline>
              <Link to="/dashboard?tab=users">See All</Link>
            </Button>
          </div>
          <Table hoverable className="">
            <Table.Head className="dark:bg-[#121212]">
              <Table.HeadCell className="dark:bg-[#121212]">
                User image
              </Table.HeadCell>
              <Table.HeadCell className="dark:bg-[#121212]">
                Username
              </Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y ">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-[#121212] dark:hover:bg-[#000] ">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        <div className="flex h-fit flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-[#1E1E1E]">
          <div className="flex justify-between p3  text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>

            <Button className="" color="blue" outline>
              <Link to="/dashboard?tab=comments">See All</Link>
            </Button>
          </div>
          <Table hoverable className="">
            <Table.Head className="dark:bg-[#121212]">
              <Table.HeadCell className="dark:bg-[#121212]">
                Comment content
              </Table.HeadCell>
              <Table.HeadCell className="dark:bg-[#121212]">
                Likes
              </Table.HeadCell>
            </Table.Head>
            {users &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-[#121212] dark:hover:bg-[#000] ">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.text}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        <div className="flex h-fit flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-[#1E1E1E]">
          <div className="flex justify-between p3  text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>

            <Button className="" color="blue" outline>
              <Link to="/dashboard?tab=posts">See All</Link>
            </Button>
          </div>
          <Table hoverable className="">
            <Table.Head className="dark:bg-[#121212]">
              <Table.HeadCell className="dark:bg-[#121212]">
                Post image
              </Table.HeadCell>
              <Table.HeadCell className="dark:bg-[#121212]">
                Post Title
              </Table.HeadCell>
              <Table.HeadCell className="dark:bg-[#121212]">
                Post Category
              </Table.HeadCell>
            </Table.Head>
            {users &&
              posts.map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-[#121212] dark:hover:bg-[#000]">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt="post"
                        className="w-10 h-10 rounded-md] bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className="w-5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
export default DashboardStats;
