import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

function EditModal({ id, setIsOpen, setPosts, posts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const postToEdit = posts.find((post) => post._id === id);
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    }
  }, [id, posts]);

  const handleEdit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
        title,
        content,
      });

      setPosts(posts.map((post) => (post._id === id ? response.data.post : post)));
      setIsOpen(false);
    } catch (error) {
      console.error("Error editing post", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-600">Update Post</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            <FiX size={20} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-3 bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded mb-3 h-24 bg-transparent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          onClick={handleEdit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EditModal;
