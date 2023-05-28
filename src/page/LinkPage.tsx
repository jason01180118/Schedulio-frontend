import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function LinkPage (): JSX.Element {
  const [value, setValue] = useState<string>('')
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }
  return (

    <div className='absolute w-full h-[92%] flex flex-col justify-center items-center bg-white bg-opacity-40 '>
      <p className='my-2 text-3xl font-Alata'>Input others Gmail to get their calendar</p>
      <input className='font-Alata my-2 w-[50%] h-[6%] rounded-1xl bg-white bg-opacity-0 icon-center' value={value} onInput={handleInput}/>
      <span className="my-2 w-[70%] h-1 bg-black"></span>
      <Link to={`/calendar/${value}`} className='w-24 my-2 text-3xl font-Alata cursor-pointer bg-green-200 rounded-3xl shadow-lg' >search</Link>
    </div>
  )
}

export default LinkPage
