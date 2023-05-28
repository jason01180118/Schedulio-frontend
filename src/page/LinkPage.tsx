import React, { useState } from 'react'
import { sendMail } from '../server/aixos'

function LinkPage (): JSX.Element {
  const [value, setValue] = useState<string>('')
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }
  const testMail = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    sendMail(value).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  return (

    <form className='absolute w-full h-[92%] flex flex-col justify-center items-center' onSubmit={testMail}>
      <p className='my-2 text-3xl font-Alata'>Input others Gmail to get their calendar</p>
      <input className='font-Alata my-2 w-[50%] h-[6%] rounded-1xl bg-white bg-opacity-50' value={value} onInput={handleInput}/>
      {/* <span className="w-[70%] h-1 bg-gray-400"></span> */}
      <input type='submit' className='w-24 my-2 text-3xl font-Alata cursor-pointer bg-green-200 rounded-3xl shadow-lg' value="Send"></input>
    </form>
  )
}

export default LinkPage
