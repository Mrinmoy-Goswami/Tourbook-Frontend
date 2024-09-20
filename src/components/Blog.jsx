import React from 'react'
import picDefault from '../assets/bg.jpg'
import { Link } from 'react-router-dom'
// import { url } from '../url'
function Blog({post}) {
  // const uploadLink = `${url}images/`
  return (
    <div className='sm:w-1/4 sm:h-[300px] h-[400px] w-full  flex flex-col border-2 border-solid border-sky-200 
    rounded-xl m-3 ring-2 ring-emerald-400 items-center bg-gradient-to-r 
    from-sky-400 to-emerald-500 hover:from-emerald-500 hover:to-sky-400 font-serif 
    text-white transform transition-transform duration-300 hover:-translate-y-5  overflow-y-auto'>
        

      <img src={post.pic ? `${post.pic}` : picDefault } loading='lazy' 
       className='sm:h-1/2 h-1/2 w-full object-cover rounded-xl aspect-auto' alt="A scenery"/>
      <h4 className='text-md  '>{post.username}</h4>
      <h4 className='text-sm'>{new Date(post.createdAt).toDateString()}</h4>
      <h2 className='md:text-xl text-md font-bold text-center'>{post.title}</h2>
       
      <p className='px-3 line-clamp-4'> {post.content}</p>
      <Link to={`/post/${post._id}`}>
      <button className='bg-pink-400 p-1 rounded hover:bg-pink-600 my-2 h-10 w-28' >Read more</button>
    </Link>

    </div>
  )
}

export default Blog
