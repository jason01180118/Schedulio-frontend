import React, { useState } from 'react'
import { signUp } from '../server/aixos'
import { Link, Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import register from '../assets/register.png'

function RegisterPage (): JSX.Element {
  const [cookies] = useCookies(['token'])
  const [errMsg, setErrMsg] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const initValues = (): void => {
      target.account.value = ''
      target.password.value = ''
      target.passwordAgain.value = ''
    }
    const target = e.target as typeof e.target & {
      account: { value: string }
      password: { value: string }
      passwordAgain: { value: string }
    }
    const account = target.account.value
    const password = target.password.value
    const passwordAgain = target.passwordAgain.value
    if (password === passwordAgain) {
      signUp(account, password).then((res) => {
        setErrMsg('success')
      }).catch((err) => {
        setErrMsg(err.message)
      })
    } else {
      setErrMsg('password err')
    }
    initValues()
  }
  if (cookies.token !== undefined) {
    console.log(cookies.token)
    return <Navigate to='/' />
  } else if (errMsg === 'success') {
    return <Navigate to='/login' />
  } else {
    return (
    <div className='fixed w-full h-full flex flex-col -right-1/4 items-center'>
      {/* <p className='fontsize-bigtitle font-Alata mb-4'>register</p> */}
      <form className='w-[66.6%] h-full bg-gray-200 bg-opacity-50 flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <img className='relative h-20 mb-4' src={register}/>
        <label className='fontsize-title font-Alata mb-1' htmlFor='account'>User Name</label>
        <input className='fontsize-title font-Alata mb-2 w-[40%] h-[5%] mx-12 flex justify-center items-center rounded-3xl bg-white bg-opacity-80' name='account' type='text'></input>
        <label className='fontsize-title font-Alata mb-1' htmlFor='password'>Password</label>
        <input className='fontsize-title font-Alata mb-2 w-[40%] h-[5%] mx-12 flex justify-center items-center rounded-3xl bg-white bg-opacity-80' name='password' type='password'></input>
        <label className='fontsize-title font-Alata mb-1' htmlFor='passwordAgain'>Password  Again</label>
        <input className='fontsize-title font-Alata mb-4 w-[40%] h-[5%] mx-12 flex justify-center items-center rounded-3xl bg-white bg-opacity-80' name='passwordAgain' type='password'></input>
        <input className='fontsize-title font-Alata mb-2 cursor-pointer w-[12%] bg-green-200 rounded-3xl shadow-md' type='submit' value="Create"></input>
        <label className='text-xs text-gray-500 font-Alata mb-1'>Already have your account?</label>
        <Link to="/login" className='text-xs text-gray-500 underline font-Alata mb-1'>Sign In</Link>
        <p className='fontsize-title text-red-600 font-Alata mb-4'>{errMsg}</p>
      </form>

    </div>
    )
  }
}

export default RegisterPage
