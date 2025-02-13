import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import PostModal from "../../../components/PostModal";

const HeaderTabs = ({posts, setPosts}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <div className="hidden md:flex w-[90%] mx-auto justify-between items-center py-3 border-b bg-white">
      {/* Left Section: Tabs */}
      <div className="flex items-center space-x-6">
        <p
          className=" hover:text-black font-medium pb-1 min-w-16 border-b-2 border-black text-black "
        >
          All Posts
        </p>
        
      </div>

      {/* Right Section: Buttons */}
      <div className="flex items-center space-x-2 ml-3" onClick={()=>setIsOpen(true)}>
        <button className="flex gap-1 justify-center items-center px-2 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition min-w-36">
          Write a Post <FaChevronDown className="mt-1 ml-1"/>
        </button>

      </div>
      {isOpen && <PostModal setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} />}
    </div>


    {/* mobile tab */}
    <div className="flex md:hidden py-3 px-7 -mb-8 justify-between items-center">
      <p className="font-semibold text-black">Posts</p>
      <div className="">
      {/* Right Section: Buttons */}
      <div className="flex items-center space-x-2 ml-3" onClick={()=>setIsOpen(true)}>
        <button className="flex gap-1 justify-center items-center px-2 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition min-w-36">
          Write a Post <FaChevronDown className="mt-1 ml-1"/>
        </button>

      </div>
      {isOpen && <PostModal setIsOpen={setIsOpen} posts={posts} setPosts={setPosts} />}
    </div>

      </div>
    </>
  );
};

export default HeaderTabs;
