import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './css/App.css'

const Login = React.lazy(() => import('./pages/SignupLogin/Login/Login'))
const Signup = React.lazy(() => import('./pages/SignupLogin/Signup/Signup'))

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
