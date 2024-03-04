import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../../components/shared/CallToAction";
import CommentSection from "../../components/ui/CommentSection";

const PostDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState({});

  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/posts/getposts/?slug=${slug}`);
        const data = await res.json();

        if (data.success) {
          setPost(data?.posts[0]);
          setLoading(false);
          setError(false);
          console.log(data?.posts[0]);
        } else {
          setError(true);
          setLoading(false);
          console.log("Could not fetch post");
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div>
        <Spinner
          size="xl"
          className="flex justify-center items-center min-h-screen mx-auto"
        />
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {" "}
        {post && post?.title}
      </h1>
      <Link
        to={`/search?category=${post?.category}`}
        className="self-center mt-5 "
      >
        <Button color="gray" pill size="xs">
          {post && post?.category}
        </Button>
      </Link>
      <img
        src={post?.image}
        alt={post?.title}
        className="mt-8 w-full rounded-lg object-cover object-center max-h-[600px] "
      />
      <div className="flex justify-between items-center mt-5 border-b   text-xs border-gray-300 pb-5">
        <span>{new Date(post?.createdAt).toLocaleString()}</span>
        <span className="italic">
          {(post?.content.length / 1000).toFixed(0)} min to read
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post?.content }}
        className="mt-10 p-3 max-w-2xl mx-auto w-full content"
      ></div>
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center mt-10">
        <CallToAction />
      </div>
      <CommentSection postId={post?._id} />
    </main>
  );
};

export default PostDetails;
