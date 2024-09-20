import React from 'react'
import Lottie from 'lottie-react'
import loading from '../assets/Loading.json'

const Loader = () => {
  return (
    <div className='h-screen w-screen sm:h-auto object-cover z-[-2] bg-black-400 '>
      <div className='h-screen w-screen flex items-center justify-center '>

      <Lottie  animationData={loading} className='h-20 w-20'/>
      </div>
    </div>
  )
}

export default Loader
