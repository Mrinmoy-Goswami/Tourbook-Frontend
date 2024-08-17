import React from 'react'
import Lottie from 'lottie-react'
import loading from '../assets/Loading.json'

const Loader = () => {
  return (
    <div className='h-screen sm:h-auto object-cover z-[-2] bg-black-400 '>
      <div className='h-20 w-20'>

      <Lottie  animationData={loading}/>
      </div>
    </div>
  )
}

export default Loader
