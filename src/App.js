import React, { useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { checkApplication } from './js/utils/checker'

import './css/App.css'
import 'react-toastify/dist/ReactToastify.css'

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const Login = React.lazy(() => import('./pages/SignupLogin/Login/Login'))
const Signup = React.lazy(() => import('./pages/SignupLogin/Signup/Signup'))

export default function App() {
  const checkApp = useCallback(() => {
    checkApplication()
  }, [])
  checkApp()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
