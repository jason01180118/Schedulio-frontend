import React, { useState } from 'react'
import { signUp } from '../server/aixos'
import { Link } from 'react-router-dom'

function RegisterPage (): JSX.Element {
  const [errMsg, setErrMsg] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      account: { value: string }
      password: { value: string }
      passwordAgain: { value: string }
    }
    const account = target.account.value
    const password = target.password.value
    const passwordAgain = target.passwordAgain.value
    if (password === passwordAgain) {
      signUp(account, password).then(() => {
        setErrMsg('success')
      }).catch((err) => {
        setErrMsg(err.message)
      })
    } else {
      setErrMsg('password err')
    }
  }
  return (
    <div className='absolute w-full h-[92%] flex flex-col justify-center items-center'>
      <p className='fontsize-bigtitle font-Alata mb-4'>register</p>
      <form className='w-[40%] h-[70%] bg-white rounded-xl flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <label className='fontsize-title font-Alata mb-4' htmlFor='account'>account</label>
        <input className='fontsize-title font-Alata mb-4 border' name='account' type='text'></input>
        <label className='fontsize-title font-Alata mb-4' htmlFor='password'>password</label>
        <input className='fontsize-title font-Alata mb-4 border' name='password' type='password'></input>
        <label className='fontsize-title font-Alata mb-4' htmlFor='passwordAgain'>passwordAgain</label>
        <input className='fontsize-title font-Alata mb-4 border' name='passwordAgain' type='password'></input>
        <input className='fontsize-title font-Alata mb-4 cursor-pointer' type='submit' value="create"></input>
        <Link to="/login" className='fontsize-title font-Alata mb-4'>login</Link>
        <p className='fontsize-title text-red-600 font-Alata mb-4'>{errMsg}</p>
      </form>

    </div>
  )
}

export default RegisterPage
