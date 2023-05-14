import React from 'react'
import { Link } from 'react-router-dom'

function SignPage (): JSX.Element {
  return (
    <div>
      <p className="text-5xl">hello world</p>
      <Link to="/">back</Link>
    </div>
  )
}

export default SignPage
