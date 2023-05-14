import React from 'react'
import { Link } from 'react-router-dom'

function App (): JSX.Element {
  return (
    <div>
      <p className="text-5xl">hello world</p>
      <Link to="/login">login</Link>
      <Link to="/link">link</Link>
      <Link to="/calendar">calendar</Link>
    </div>
  )
}

export default App
