import React from 'react'
import Blog from './Blog'

export default function Blogs({posts}) {
  return (
    <div className='flex w-full  flex-wrap justify-around z-10 sm:p-5 p-2'>
        {
          posts.map((post)=><Blog key={post._id} post={post} />)
        }


    </div>
  )
}
