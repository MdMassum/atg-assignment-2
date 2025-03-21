import React, { useState } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi";

function PostModal({ setIsOpen, posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("content", content);

    for (let image of images) {
      data.append("images", image);
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/create`,
        data,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );

      // Add the new post to the existing list
      setPosts([response.data.post, ...posts]);

      // Close modal and reset form
      setTitle("");
      setContent("");
      setIsOpen(false);
    } catch (error) {
      setError("Failed to create post. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-600">Create Post</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-black">
            <FiX size={20} />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-3 bg-transparent text-gray-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded mb-3 h-24 bg-transparent text-gray-700"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-3 bg-transparent text-gray-700 cursor-pointer"
        />
        <button
          onClick={handleCreatePost}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}

export default PostModal;
