import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function Header (): JSX.Element {
  const [cookies,, removeCookie] = useCookies(['token'])
  const [login, setLogin] = useState(false)
  const links = [
    { title: 'mycalendar', to: '/calendar' },
    { title: 'other', to: '/link' }
  ]
  useEffect(() => {
    if (cookies.token !== undefined) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [cookies.token])

  return (
    <ul className="h-[8%] w-full border-b shadow-sm flex items-center">
      <ul className="w-[45%] h-full ml-[5%] flex items-center justify-evenly">
        <Link className="fontsize-bigtitle font-Allura px-[5%]" to="/">Schedulio</Link>
        {links.map((item) => <li key={item.title}><Link className="fontsize-content font-Alata" to={item.to}>{item.title}</Link></li>)}
      </ul>
    {
      login
        ? <button className='w-[45%] fontsize-content font-Alata text-right' onClick={() => { removeCookie('token'); console.log(cookies.token) }}>logout</button>
        : <Link className='w-[45%] fontsize-content font-Alata text-right' to="/login">sign in</Link>

    }

    </ul>

  )
}

export default Header
