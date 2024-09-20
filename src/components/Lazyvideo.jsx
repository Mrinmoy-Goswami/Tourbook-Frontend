import React from 'react'
// import vid from "../assets/bgvideo.webm"
import bgimage from "../assets/bghome.jpg"

const Lazyvideo = () => {
  return (
    // <video autoPlay loop muted className=" h-screen sm:h-auto object-cover z-[-2]   videobg">
    //         <source src={vid} type="video/webm" />
    //       </video>

    <div className='w-screen h-screen'>
      <img src={bgimage}  className='w-full h-full  object-cover z-[-2]'/>
    </div>
  )
}

export default Lazyvideo
