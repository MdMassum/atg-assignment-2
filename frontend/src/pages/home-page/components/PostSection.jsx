import React from "react";
import axios from "axios";
import PostCard from "../../../components/PostCard";

function PostSection({posts, setPosts, loading}) {


  const handleDelete = async (id) => {
    try {

      await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`,{withCredentials:true});
      setPosts(posts.filter((post) => post._id !== id));

    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  return (
    <div className="w-full md:w-[65%] text-black border-r border-gray-200 md:pr-5">
      <div className="flex flex-col items-center gap-4 mt-6">
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} {...post} id={post._id} onDelete={handleDelete} setPosts={setPosts} posts={posts}/>
          ))
        )}
      </div>
    </div>
  );
}

export default PostSection;
