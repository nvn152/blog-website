import React, { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime().toString() + file.name;
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setImageUploadProgress(progress.toFixed(0));
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log(error);
          setImageUploadError(error.message);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUploadError(null), setImageUploadProgress(null);
            setImagePreview(url);
            setFormData({ ...formData, image: url });
            console.log(url);
          });
        }
      );
    } catch (error) {
      setImageUploadError(error.message);
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/posts/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === true) {
        toast.success("Post created successfully");
        setFormData({});
        setImagePreview(null);
        navigate(`/post/${data.newPost.slug}`);
      } else {
        toast.error("Could not create post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mx-3 mt-8 ">
      <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 max-w-full ">
          <label
            htmlFor="title"
            className="block dark:text-gray-100 text-gray-700 font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-[#3f3f3f] dark:text-gray-300"
            required
            placeholder="Enter title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
        </div>
        <div className="mb-4 max-w-full">
          <ReactQuill
            className="h-[300px] placeholder:text-[#888] "
            theme="snow"
            placeholder="Write your content here..."
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
        </div>

        <div className="flex-col md:flex-row flex gap-5 mt-20 md:mt-14 justify-between">
          <div className="mb-4  max-w-[400px]  ">
            <label
              htmlFor="category"
              className="block text-gray-700 font-bold mb-2 dark:text-gray-100"
            >
              Category
            </label>
            <select
              id="category"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-[#3f3f3f] dark:text-gray-300"
              required
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="programming">Programming</option>
              <option value="artificial-intelligence">
                Artificial Intelligence
              </option>
            </select>
          </div>

          <div className="mb-4 max-w-full ">
            <label
              htmlFor="file"
              className="block text-gray-700 font-bold mb-2 dark:text-gray-100"
            >
              {imageUploadError
                ? imageUploadError
                : imageUploadProgress
                ? `Uploading ${imageUploadProgress}%`
                : "Upload Image"}

              {imageUploadError &&
                toast.error(imageUploadError, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })}
            </label>
            <div className="md:flex flex-col md:max-w-30">
              <input
                type="file"
                id="file"
                className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 "
                onChange={handleImageChange}
                accept="image/*"
              />

              {formData.profilePicture && (
                <div className="mb-4 max-w-[600px] ">
                  <img
                    src={formData.profilePicture}
                    alt="preview"
                    className="rounded-md w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md outline-none hover:bg-blue-600 h-12 my-auto"
          >
            Create Post
          </button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default CreatePost;
