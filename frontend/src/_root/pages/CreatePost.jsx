import React, { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission (e.g., send data to server)
    console.log({ title, content, selectedFile, category });
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4 max-w-full">
          <ReactQuill
            className="h-[300px] placeholder:text-[#888] "
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write your content here..."
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
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
              Select File/Image
            </label>
            <input
              type="file"
              id="file"
              className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 "
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md outline-none hover:bg-blue-600 h-12 my-auto"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;