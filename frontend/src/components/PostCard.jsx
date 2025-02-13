
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaThumbsUp, FaComment, FaEdit } from "react-icons/fa";
import EditModal from "./EditModal";

export default function PostCard({ id, author, comments, likes, title, content, onDelete, setPosts, posts, userId }) {

  const [localLikes, setLocalLikes] = useState(likes.length);
  const [liked, setLiked] = useState(likes.some((like) => like === userId));
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState(comments);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Like & Unlike
  const handleLikeToggle = async () => {
    const url = liked
      ? `${import.meta.env.VITE_BASE_URL}/posts/unlike/${id}`
      : `${import.meta.env.VITE_BASE_URL}/posts/like/${id}`;
      console.log(url)

    try {
      // const response = await axios.post(url, {}, { withCredentials: true });

      setLocalLikes((prev) => (liked ? Math.max(prev - 1, 0) : prev + 1));
      setLiked(!liked);

    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  // Handle Add Comment API Request
  const handleComment = async () => {
    if (!commentText.trim()) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/comment/${id}`,
        { text: commentText },
        { withCredentials: true }
      );

      setLocalComments(response.data.post.comments);
      setCommentText("");
    } catch (error) {
      setError("Failed to add comment. Please try again.");
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-80 md:w-96 border border-gray-200">
      {/* Title and Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          <FaEdit
            className="text-blue-500 cursor-pointer hover:text-blue-700"
            onClick={() => setIsOpen(true)}
          />
          <FaTrash
            className="text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => onDelete(id)}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {isOpen && <EditModal setIsOpen={setIsOpen} id={id} setPosts={setPosts} posts={posts} />}

      <p className="text-gray-700 mt-2">{content}</p>

      {/* Like and Comment Buttons */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
              liked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            <FaThumbsUp /> {localLikes}
          </button>
          <button className="flex items-center gap-1 text-green-500 hover:text-green-700">
            <FaComment /> {localComments.length}
          </button>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Posted By {author?.username}</p>
        </div>
      </div>

      {/* Comment Input */}
      <div className="mt-4">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="border p-2 w-full rounded bg-transparent"
        />
        <button
          onClick={handleComment}
          className="mt-2 w-full bg-green-500 text-white py-1 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Comment"}
        </button>
      </div>

      {/* Display Comments */}
      {localComments.length > 0 && (
        <ul className="mt-3 border-t pt-2">
          {localComments.map((c, index) => (
            <li key={index} className="text-gray-800 text-sm mt-2 flex flex-col">
              <div className="flex item-center justify-between">
              <span className="ml-2">{c.text}</span>
              <span className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

