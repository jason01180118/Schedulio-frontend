import React, { useState } from 'react'
import { logIn } from '../server/aixos'
import { Link, Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

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
    <div className='absolute w-full h-[92%] flex flex-col justify-center items-center'>
      <p className='fontsize-bigtitle font-Alata mb-4'>sign in</p>
      <form className='w-[40%] h-[60%] bg-white rounded-xl flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <label className='fontsize-title font-Alata mb-4' htmlFor='account'>account</label>
        <input className='fontsize-title font-Alata mb-4 border' name='account' type='text'></input>
        <label className='fontsize-title font-Alata mb-4' htmlFor='password'>password</label>
        <input className='fontsize-title font-Alata mb-4 border' name='password' type='password'></input>
        <input className='fontsize-title font-Alata mb-4 cursor-pointer' type='submit' value="login"></input>
        <Link to="/register" className='fontsize-title font-Alata mb-4'>register</Link>
        <p className='fontsize-title text-red-600 font-Alata mb-4'>{errMsg}</p>
      </form>

    </div>
    )
  }
}

export default SignPage
