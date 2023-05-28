import React, { useState } from 'react'
import { signUp } from '../server/aixos'
import { Link, Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import register from '../assets/register.png'

function RegisterPage (): JSX.Element {
  const [cookies] = useCookies(['session'])
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
  if (cookies.session !== undefined) {
    console.log(cookies.session)
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
        <div className='mb-2 w-[40%] h-[5%] mx-12 flex justify-center items-center bg-white rounded-3xl'>
        <input className='fontsize-title font-Alata w-[95%] h-full flex justify-center items-center bg-transparent' name='account' type='text'></input>
        </div>
        <label className='fontsize-title font-Alata mb-1' htmlFor='password'>Password</label>
        <div className='mb-2 w-[40%] h-[5%] mx-12 flex justify-center items-center bg-white rounded-3xl'>
        <input className='fontsize-title font-Alata w-[95%] h-full flex justify-center items-center bg-transparent' name='password' type='password'></input>
        </div>
        <label className='fontsize-title font-Alata mb-1' htmlFor='passwordAgain'>Password  Again</label>
        <div className='mb-2 w-[40%] h-[5%] mx-12 flex justify-center items-center bg-white rounded-3xl'>
        <input className='fontsize-title font-Alata w-[95%] h-full flex justify-center items-center bg-transparent' name='passwordAgain' type='password'></input>
        </div>
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
