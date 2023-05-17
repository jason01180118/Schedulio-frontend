import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendMail } from '../server/aixos'

function LinkPage (): JSX.Element {
  const [value, setValue] = useState<string>('')
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }
  const testMail = (): void => {
    sendMail(value).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  return (

    <div>
      <p className="text-5xl">hello world</p>
      <input value={value} onInput={handleInput}/>
      <button onClick={testMail}>send</button>

      <Link to="/">back</Link>
    </div>
  )
}

export default LinkPage
