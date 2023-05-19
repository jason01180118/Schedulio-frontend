import React from 'react'

function SignPage (): JSX.Element {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log(e.currentTarget.elements)
  }
  return (
    <div className='absolute w-full h-[92%] flex flex-col justify-center items-center'>
      <p className='fontsize-content font-Alata mb-4'>sign in</p>
      <form className='w-[40%] h-[60%] bg-white rounded-xl flex flex-col items-center justify-center' onSubmit={handleSubmit}>
      <label htmlFor='account'>account</label>
        <input name='account' type='text'></input>
        <label htmlFor='password'>password</label>
        <input name='password' type='text'></input>

        <input type='submit'></input>
      </form>
    </div>
  )
}

export default SignPage
