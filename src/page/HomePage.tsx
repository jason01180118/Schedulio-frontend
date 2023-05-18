import React from 'react'
import background from '../assets/background.png'
import { Link } from 'react-router-dom'

function HomePage (): JSX.Element {
  return (
    <div className='absolute w-full h-full'>
      <img className='absolute w-full h-full z-[-1]' src={background}/>
      <div className='absolute w-full h-full flex justify-center items-center'>
        <Link to='/calendar' className='w-[20%] h-[10%] mx-12 rounded-2xl border-blue-500 border-sm'>calendar</Link>
        <Link to='/link' className='w-[20%] h-[10%] mx-12 rounded-2xl border-blue-500 border-sm'>link</Link>
      </div>
    </div>
  )
}

export default HomePage
