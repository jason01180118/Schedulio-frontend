import React from 'react'

import { Link } from 'react-router-dom'

function HomePage (): JSX.Element {
  return (
    <div className='absolute w-full h-[92%]'>
      <div className='absolute w-full h-full flex justify-center items-center'>
        <Link to='/calendar' className='w-[18%] h-[6%] mx-12 flex justify-center items-center bg-gray-200 rounded-3xl shadow.lg'>
          <p className='text-3xl font-Alata'>
            My Calendar
            </p></Link>
        <Link to='/link' className='w-[18%] h-[6%] mx-12 flex justify-center items-center bg-gray-200 rounded-3xl shadow.lg'>
          <p className='text-3xl font-Alata'>
            Other Calendar
            </p></Link>
      </div>
    </div>
  )
}

export default HomePage
