import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')

    const navigate=useNavigate()

    const handlelogin=async()=>{
        if(!email||!password){
            alert("all feilds must be filled")
        }
        try {
            const res= await axios.post("http://localhost:2727/user/login",{
                email,password
            })
            alert("login successfull")
            localStorage.clear();
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("username",res.data.username)
            navigate("/")
        } catch (error) {
            if(error.response){
                if(error.response.data.message=="user not found"){
                    alert("you don't have an account...signup")
                    navigate('/signup')
                }
            }

            
        }

    }
  return (
    <div>
        <div className='h-screen w-screen flex justify-center items-center bg-pink-200'>
            <div className='h-100 w-80 bg-pink-300 rounded-2xl border-2 border-pink-900 shadow-2xl shadow-black flex flex-col'> 
                <div className='text-2xl mt-2 ml-3 font-extrabold'>
                    Login
                </div>

                <div className='ml-3 mt-3'>
                    email
                    <div className='mr-3'>

                    <input type="text"
                    value={email}
                    onChange={(e)=>{setemail(e.target.value)}}
                    className=' px-2 py-2 w-full rounded-2xl border-2 border-black mr-3 ' />
                    </div>

                </div>

                <div className='ml-3 mt-3'>
                    password
                    <div className='mr-3'>
                        <input type="text"
                        value={password}
                        onChange={(e)=>{setpassword(e.target.value)}}
                        className=' px-2 py-2 w-full rounded-2xl border-2 border-black' />
                    </div>
                </div>

                <div className='text-center mt-3'>don't have an account? </div>
                <div className='text-center hover:underline hover:-translate-1 hover:scale-105 transition-all'
                onClick={()=>{navigate('/signup')}
                }>
                    signup</div>

                <div className='w-full flex justify-center mt-auto mb-5'>

                    <div className='border-pink-900 border-2 rounded-2xl p-2
                    hover:bg-pink-700
                    hover:-translate-y-1
                    hover:scale-105
                    hover:shadow-2xl
                    hover:shadow-black
                    transition-all
                    duration-200'
                    
                    onClick={()=>{handlelogin()}}
                    >
                        Login
                    </div>

                </div>

            </div>


        </div>
    </div>
  )
}

export default Login