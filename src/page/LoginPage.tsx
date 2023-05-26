import React, { useState } from 'react'
import { logIn } from '../server/aixos'
import { Link, Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import user from '../assets/user.png'

function SignPage (): JSX.Element {
  const [cookies, setCookie] = useCookies(['token'])
  const [errMsg, setErrMsg] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      account: { value: string }
      password: { value: string }
    }
    const account = target.account.value
    const password = target.password.value
    logIn(account, password).then((res) => {
      console.log(res.data)
      setCookie('token', res.data, { maxAge: 3600 })
      console.log(cookies.token)
      setErrMsg('success')
    }).catch((err) => {
      setErrMsg(err.message)
    })
  }
  if (cookies.token !== undefined) {
    console.log(cookies.token)
    return <Navigate to='/' />
  } else {
    return (
      <div className='fixed w-full h-full flex flex-col -right-1/4 items-center'>
      {/* <p className='fontsize-bigtitle font-Alata mb-4'>sign in</p> */}
      <form className='w-[66.6%] h-full bg-gray-200 bg-opacity-50 flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <img className='relative h-20 mb-4' src={user}/>
        {/* <label className='fontsize-bigtitle font-Alata mb-4'>Sign In</label> */}
        <label className='fontsize-title font-Alata mb-1' htmlFor='account'>User Name</label>
        <input className='fontsize-title font-Alata mb-2 w-[40%] h-[5%] mx-12 flex justify-center items-center rounded-3xl bg-white bg-opacity-80' name='account' type='text'></input>
        <label className='fontsize-title font-Alata mb-1' htmlFor='password'>Password</label>
        <input className='fontsize-title font-Alata mb-4 w-[40%] h-[5%] mx-12 flex justify-center items-center rounded-3xl bg-white bg-opacity-80' name='password' type='password'></input>
        <input className='fontsize-title font-Alata mb-2 w-[10%] h-[5%] mx-12 flex justify-center items-center bg-green-200 rounded-3xl shadow-md' type='submit' value="Sign In"></input>
        <label className='text-xs text-gray-500 font-Alata'>Do not have account?</label>
        <Link to="/register" className='text-xs text-gray-500 underline font-Alata'>Sign Up</Link>
        <p className='fontsize-title text-red-600 font-Alata mb-4'>{errMsg}</p>
      </form>

    </div>
    )
  }
}

export default SignPage
