import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function Header (): JSX.Element {
  const [cookies,, removeCookie] = useCookies(['session'])
  const [login, setLogin] = useState(false)
  const links = [
    { title: 'My Calendar', to: '/calendar' },
    { title: 'Other Calendar', to: '/link' }

  ]
  useEffect(() => {
    if (cookies.session !== undefined) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [cookies.session])

  return (
    <ul className="h-[8%] w-full border-b shadow-sm flex items-center justify-between">
      <ul className="w-[45%] h-full ml-[5%] flex items-center justify-evenly">
        <Link className="h-[50%] fontsize-bigtitle font-Allura px-[5%]" to="/">Schedulio</Link>
        {links.map((item) => <li key={item.title}><Link className="fontsize-content font-Alata" to={item.to}>{item.title}</Link></li>)}
      </ul>
    {
      login
        ? <button className='w-[7%] h-[50%] fontsize-content font-Alata mx-12 flex justify-center items-center bg-green-200 rounded-3xl' onClick={() => { removeCookie('session'); console.log(cookies.session) }}>Log Out</button>
        : <Link className='w-[6%] h-[50%] fontsize-content font-Alata mx-12 flex justify-center items-center bg-green-200 rounded-3xl' to="/login">Sign In</Link>

    }

    </ul>

  )
}

export default Header
