import React from 'react'
import { Link } from 'react-router-dom'

function Header (): JSX.Element {
  const links = [
    { title: 'mycalendar', to: '/calendar' },
    { title: 'other', to: '/link' }

  ]
  const hrefs = [
    { href: 'https://github.com/jason01180118/Schedulio-frontend', title: 'frontend' },
    { href: 'https://github.com/jason01180118/Schedulio-backend', title: 'backend' }
  ]

  return (
    <ul className="h-[8%] w-full border-b shadow-sm flex items-center">
      <ul className="w-[45%] h-full ml-[5%] flex items-center justify-evenly">
        <Link className="fontsize-title px-[5%]" to="/">Schedulio</Link>
        {links.map((item) => <li key={item.title}><Link className="fontsize-content" to={item.to}>{item.title}</Link></li>)}
      </ul>
      <ul className="w-[45%] ml-[5%] flex justify-evenly">
        {hrefs.map((item) => <li key={item.title}><a className="fontsize-content" href={item.href} target="_blank" rel="noreferrer">{item.title}</a></li>)}
      </ul>

    </ul>
  )
}

export default Header
