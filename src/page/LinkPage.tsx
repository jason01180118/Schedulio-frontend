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
      <p className='my-4 text-3xl font-Alata'>請輸入對方email</p>
      <input className='my-4 w-[18%] h-[6%] rounded-2xl' value={value} onInput={handleInput}/>
      <input type='submit' className='w-24 my-4 text-3xl font-Alata cursor-pointer bg-gray-200 rounded-3xl shadow.lg' value="send"></input>
    </form>
  )
}

export default LinkPage
