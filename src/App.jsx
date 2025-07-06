import React, { useContext } from 'react'
import { Routes , Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customization from './pages/Customization'
import { userDataContext } from './context/UserContext'
import Home from './pages/Home'


function App() {
  const {userData,setUserData}=useContext(userDataContext)
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home/>}/>

        <Route path="/signup" element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
        <Route path="/signin" element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
      

      </Routes>
      
    </div>
  )
}

export default App
