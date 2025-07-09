import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'


export const userDataContext=createContext()
function UserContext({children}) {
    const serverUrl="https://chatbot-backend-git-main-saurabh-singhs-projects-a1962278.vercel.app"
    const [userData,setUserdata]=useState(null)
    const handleCurrentUser=async()=>{
      try {
        const result =await axios.get(`${serverUrl}/api/user/currentuser`,{  withCredentials: true})
        setUserdata(result.data)
        console.log(result.data)
      } catch (error) {
        console.log("error during current data fetching",error)
        
      }
    }
      useEffect(()=>{
        handleCurrentUser()
      },[])
    const value={
serverUrl,userData,setUserdata

    }
  return (
  
        <userDataContext.Provider value={value}>
   {children}
   </userDataContext.Provider>
      
   
  )
}

export default UserContext
