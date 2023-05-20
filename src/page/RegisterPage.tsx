import React, { useState } from 'react'
import { logIn } from '../server/aixos'
import { Link } from 'react-router-dom'

function RegisterPage (): JSX.Element {
  const [errMsg, setErrMsg] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      account: { value: string }
      password: { value: string }
    }
    const account = target.account.value
    const password = target.password.value
    logIn(account, password).catch((err) => {
      setErrMsg(err.message)
    })
  }
  return (
    <div className='absolute w-full h-[92%] flex flex-col justify-center items-center'>
      <p className='fontsize-bigtitle font-Alata mb-4'>sign in</p>
      <form className='w-[40%] h-[60%] bg-white rounded-xl flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <label className='fontsize-title font-Alata mb-8' htmlFor='account'>account</label>
        <input className='fontsize-title font-Alata mb-8 border' name='account' type='text'></input>
        <label className='fontsize-title font-Alata mb-8' htmlFor='password'>password</label>
        <input className='fontsize-title font-Alata mb-8 border' name='password' type='password'></input>
        <input className='fontsize-title font-Alata mb-8' type='submit'></input>
        <Link to="/login" className='fontsize-title font-Alata mb-8'>login</Link>
        <p className='fontsize-title font-Alata mb-8'>{errMsg}</p>
      </form>

    </div>
  )
}

export default RegisterPage
