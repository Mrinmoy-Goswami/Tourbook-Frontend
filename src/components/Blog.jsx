import React from 'react'
import picDefault from '../assets/bg.jpg'
import { Link } from 'react-router-dom'
// import { url } from '../url'
function Blog({post}) {
  // const uploadLink = `${url}images/`
  return (
    <div className='sm:w-1/4 sm:h-[300px] h-[400px] w-full  flex flex-col shadow-md  
     m-3 items-center bg-[#F5F5F5]  overflow-y-auto text-gray-600'>
        

      <img src={post.pic ? `${post.pic}` : picDefault } loading='lazy' 
       className='sm:h-1/2 h-1/2 w-full object-cover  aspect-auto' alt="A scenery"/>
      <h4 className='text-md font-lora italic '>{post.username}</h4>
      <h4 className='text-sm'>{new Date(post.createdAt).toDateString()}</h4>
      <h2 className='md:text-xl text-md font-bold font-pacifico text-center '>{post.title}</h2>
       
      <p className='px-3 line-clamp-4 font-lora'> {post.content}</p>
      <Link to={`/post/${post._id}`}>
      <button className='bg-[#2C3E50] p-1 rounded hover:bg-gray-900 my-2 text-white h-10 w-28' >Read more</button>
    </Link>

    </div>
  )
}

export default Blog
