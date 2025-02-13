import React, { useEffect, useState } from 'react'
import ProfileSection from './components/ProfileSection'
import PostSection from './components/PostSection'
import HeaderTabs from './components/HeaderTabs'
import axios from 'axios';

function home() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(posts)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`, {}, { withCredentials: true });
        setPosts(response.data.posts);
        console.log(response.data.posts)
      } catch (error) {
        console.error("Error fetching posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='min-h-screen bg-white flex flex-col gap-2 pb-5'>
      <HeaderTabs posts={posts} setPosts={setPosts}/>
      <div className='flex'>
        <PostSection posts={posts} setPosts={setPosts} loading={loading} />
        <ProfileSection />
      </div>

    </div>
  )
}

export default home