import React from 'react'
import vid from "../assets/bgvideo.webm"

const Lazyvideo = () => {
  return (
    <video autoPlay loop muted className=" h-screen sm:h-auto object-cover z-[-2]   videobg">
            <source src={vid} type="video/webm" />
          </video>
  )
}

export default Lazyvideo
