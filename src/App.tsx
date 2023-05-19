import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import background from './assets/background.png'

function App (): JSX.Element {
  return (
    <div className="absolute w-full h-full">
      <img className='absolute top-[8%] w-full h-[92%] z-[-1]' src={background}/>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
