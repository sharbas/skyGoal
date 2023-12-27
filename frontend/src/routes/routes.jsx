import React from 'react';

import {Routes,Route} from 'react-router-dom'

import Login from "../screens/Login.jsx"
import SignUp from '../screens/SignUp.jsx'
import Home from '../screens/Home.jsx'
import ProfileScreen from '../screens/ProfileScreen.jsx';
import NotFound from '../screens/NotFound.jsx';
//routessssss
const Routers=() =>{
  return (
  <Routes>
    <Route  index={true} path='/' element={<Home/>}/>
    <Route  path='/login' element={<Login/>}/>
    <Route  path='/register' element={<SignUp/>}/>
    <Route  path='/profile' element={<ProfileScreen/>}/>

    <Route path="*" element={<NotFound/>} />
  </Routes>

  )
}

export default Routers
