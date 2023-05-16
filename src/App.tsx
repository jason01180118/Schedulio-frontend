import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function App (): JSX.Element {
  return (
    <div className="absolute w-full h-full">
      <Header />
      <Outlet />
    </div>
  )
}

export default App
