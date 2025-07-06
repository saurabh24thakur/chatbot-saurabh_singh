import React, { useContext, useState } from 'react'
import bg from "../assets/bk1.jpg"
import {IoEye, IoEyeOff} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext.jsx';
import axios from "axios"



function SignIn() {
    const navigate = useNavigate();
    const {serverUrl,userData,setUserdata}=useContext(userDataContext)
    const [showPassword,setShowPassword]=useState(false); 
    const [email , setEmail]=useState("");
    const [password , setPassword]=useState("");
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false)



    const handleSignIn=async (e)=>{

      e.preventDefault()
      setError('')
      setLoading(true)
      try {
        let result=await axios.post(`${serverUrl}/api/auth/signin`,{email,password},{withCredentials:true})
         setUserdata(result.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
        setLoading(false)
        setUserdata(null)

      }

    }
  return (
    <div className='w-[full] h-[100vh] bg-cover flex justify-center items-center'  style={{backgroundImage:`url(${bg})`}}>
        <form action="" className='w-[90%] h-[600px] max-w-[500px] bg-[#00000060] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignIn}>
            <h1 className='text-white text-4xl border-b-2'>Log In</h1>
            <input type="email" className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] placeholder-gray-300 px-[20px] py-[10px] ' placeholder='Enter your email' required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <div className="pass relative w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] ">
                    <input type={showPassword?"text":"password"} className='w-full h-full rounded-full outline-none bg-transparent  placeholder-gray-300 px-[20px] py-[10px] ' placeholder='Enter your password' required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    {!showPassword &&  <IoEye className='absolute top-[18px] right-[20px] text-white w-[25px] h-[25px]  cursor-pointer' onClick={()=>{setShowPassword(true)}}/>}
                    {showPassword &&  <IoEyeOff className='absolute top-[18px] right-[20px] text-white w-[25px] h-[25px]  cursor-pointer' onClick={()=>{setShowPassword(false)}}/>}
            </div>  
            {error.length>0 && <p className='text-red-500'>*{err}</p>}
            <button className="min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px]" disabled={loading}>{loading?"loading...":"signIn"}</button>          
            <p className="text-white mt-[35px]" onClick={()=> navigate("/signup")}>New User? <span className='text-blue-400'>SignUp</span></p>
        </form>
      
    </div>
  )
}

export default SignIn
