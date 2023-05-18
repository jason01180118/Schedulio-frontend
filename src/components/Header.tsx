import React from 'react'
import { Link } from 'react-router-dom'

function Header (): JSX.Element {
  const links = [
    { title: 'mycalendar', to: '/calendar' },
    { title: 'other', to: '/link' }

  ]

  return (
    <ul className="h-[8%] w-full border-b shadow-sm flex items-center">
      <ul className="w-[45%] h-full ml-[5%] flex items-center justify-evenly">
        <Link className="fontsize-bigtitle font-Allura px-[5%]" to="/">Schedulio</Link>
        {links.map((item) => <li key={item.title}><Link className="fontsize-content" to={item.to}>{item.title}</Link></li>)}
      </ul>
    <Link className='w-[45%] text-right' to="/login">sign in</Link>

    </ul>
  )
}

export default Header
