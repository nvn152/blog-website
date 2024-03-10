import { Link } from "react-router-dom";

import CallToAction from "../../components/shared/CallToAction";
import { useState, useEffect } from "react";
import PostCard from "../../components/ui/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts/getPosts");
      const data = await res.json();
      setPosts(data?.posts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col gap-6 lg:p-28 p-3  mx-auto max-w-6xl ">
        <h1 className="text-3xl font-black md:text-6xl">Welcome to my blog</h1>
        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
          We’re thrilled to have you here! Whether you stumbled upon our digital
          haven by chance or intentionally sought it out, consider yourself part
          of our vibrant community. Here, we believe in the magic of words, the
          power of ideas, and the joy of shared experiences.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-blue-500 font-bold"
        >
          View All
        </Link>
      </div>
      <div className="p-3 bg-blue-100 dark:bg-white/10">
        <CallToAction />
      </div>
      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 py-7 ">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center ">
              Recent Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {posts.map((post) => (
                <PostCard key={post?._id} post={post} />
              ))}
            </div>
            <Link
              className="text-lg text-blue-500 hover:underline text-center mx-auto"
              to="/search"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
