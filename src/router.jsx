import {
  createBrowserRouter
} from 'react-router-dom'
import React from 'react'
import App from './App'
import LoginPage from './page/LoginPage'
import LinkPage from './page/LinkPage'
import CalendarPage from './page/CalendarPage'
import HomePage from './page/HomePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'link',
        element: <LinkPage />
      },
      {
        path: 'calendar',
        element: <CalendarPage />
      }
    ]
  }

])

export default router
