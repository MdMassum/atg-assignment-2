import React from 'react'

const User = {
  username:"Md Massum",
  email : "dkfjld@gmail.com"
}
function ProfileSection() {
  return (
    <div className='hidden md:flex md:w-[35%] text-black pl-3 '>
      <h1 className='mt-5 w-full mx-auto'>Hi, {User.username}</h1>
    </div>
  )
}

export default ProfileSection