import React from 'react'
import { UserRound, Ratio } from 'lucide-react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>  
    <div className='flex flex-col items-center justify-center h-screen gap-10'>
        <div className='flex gap-4 mb-8'>
            <Ratio size = {40} className='text-blue-600 '/> 
            <h2 className='font-bold text-3xl text-blue-600'>WebSite Name</h2>
        </div>
        <div className='w-1/3 rounded-xl  bg-white flex flex-col items-center pb-5'>
            <div className='bg-blue-600 w-16 h-16 rounded-full flex justify-center items-center relative bottom-6'>
                <UserRound color='white' size = {38} />
            </div>
            <h1 className='text-3xl font-bold text-'>Log In</h1>
            <p className='text-gray-900'>Welcome back! Please enter your details</p>
            <form className=' w-9/12 flex flex-col items-center mt-7 mb-4' action="" method="post">
                <input type="text" name="userName" id="userName" className='border border-gray-400 px-3 py-2 rounded-lg w-10/12 placeholder-gray-600' placeholder='User Name'/><br/>
                <input type="password" name="userPassword" id="userPassword"  className='border border-gray-400 px-3 py-2 rounded-lg w-10/12 placeholder-gray-600' placeholder='Password' />
                <button   className='bg-blue-600 text-white font-medium px-3 py-2 mt-4  rounded-lg w-10/12 placeholder-gray-600'>Log In</button>
            </form>
            <p className='text-gray-500 text-sm'>Don't have an account? <Link to="/signUp" className='text-blue-600 font-medium'>Sign up</Link></p>
        </div>
    </div>
        
        
    </>
  )
}

export default Login
