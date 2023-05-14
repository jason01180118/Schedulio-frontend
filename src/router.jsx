import {
  createBrowserRouter
} from 'react-router-dom'
import React from 'react'
import App from './App'
import LoginPage from './login/LoginPage'
import LinkPage from './link/LinkPage'
import CalendarPage from './calendar/CalendarPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/link',
    element: <LinkPage />
  },
  {
    path: '/calendar',
    element: <CalendarPage />
  }
])

export default router
