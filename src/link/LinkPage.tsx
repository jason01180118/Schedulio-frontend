import React from 'react'
import { Link } from 'react-router-dom'

function LinkPage (): JSX.Element {
  return (
    <div>
      <p className="text-5xl">hello world</p>
      <input></input>
      <Link to="/">back</Link>
    </div>
  )
}

export default LinkPage
