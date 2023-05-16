import React from 'react'
import background from '../assets/background.jpg'

function HomePage (): JSX.Element {
  return (
    <div className='absolute w-full h-full'>
      <img className='absolute w-full h-full z-[-1]' src={background}/>
      <div className='absolute w-full h-full flex justify-center items-center'>
        <button>123</button>
        <button>456</button>
      </div>
    </div>
  )
}

export default HomePage
