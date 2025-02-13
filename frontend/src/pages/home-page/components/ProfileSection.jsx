import React from 'react'
import {useSelector} from 'react-redux'

function ProfileSection() {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className='hidden md:flex flex-col md:w-[35%] text-black pl-3 '>
      <h1 className='mt-5 w-full mx-auto'>Hi, {currentUser.username}</h1>
      <p>Welcome to atg-assignment Post and comment task</p>
    </div>
  )
}

export default ProfileSection