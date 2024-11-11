import React from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Calendar from '../pages/CalenderPage'
import {Routes, Route} from 'react-router-dom'
import MyAccount from '../Dashboard/user-account/MyAccount'
import Captains from '../pages/Captains/Captains'

const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/captains" element={<Captains/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Signup/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/services" element={<Services/>} />
    <Route path='/calender' element={<Calendar />}/>
    <Route path='/users/profile/me' element={<MyAccount />}/>

  </Routes>

}

export default Routers