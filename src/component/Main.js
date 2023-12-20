import React from 'react'
import Header from './navbar/Header'
import { Route, Routes } from 'react-router-dom'
import Shop from './shop/Shop'
import Men from './men/Men'
import Women from './women/Women'
import Kids from './kids/Kids'
import Footer from './footer/Footer'
import Login from "../../src/component/auth/LogIn/LogIn"
import SignUp from './auth/SignUp/SignUp'
export default function Main() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/men' element={<Men/>} />
        <Route path='/women' element={<Women />} />
        <Route path='/kids' element={<Kids />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
      <Footer/>
    </>
  )
}
