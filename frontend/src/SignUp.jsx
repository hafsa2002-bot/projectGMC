import { UserRoundPlus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen gap-20 bg-[url('https://brandio.io/envato/iofrm/html/images/graphic8.svg')] bg-[500px_auto] bg-no-repeat bg-center">
        <div className='flex gap-4 mb-8'>
            {/* <Ratio size = {40} className='text-blue-600 '/>  */}
            <h2 className='font-bold text-5xl text-black'>Novexa</h2>
        </div>
        <div className='shadow-2xl w-96 rounded-xl  bg-white flex flex-col items-center pb-5 relative bottom-9'>
            <div className='bg-black w-16 h-16 rounded-full flex justify-center items-center relative bottom-6'>
                <UserRoundPlus color='white' size = {38} />
            </div>
            <h1 className='text-3xl font-bold text-'>Sign Up</h1>
            <form className=' w-9/12 flex flex-col items-center mt-7 mb-4' action="" method="post">
                <input type="text" name="userName" id="userName" className='border border-gray-400 px-3 py-2 rounded-lg w-10/12 placeholder-gray-600' placeholder='User Name'/><br/>
                <input type="password" name="userPassword" id="userPassword"  className='border border-gray-400 px-3 py-2 rounded-lg w-10/12 placeholder-gray-600' placeholder='Password' /><br/>
                <input type="password" name="userPasswordConfirm" id="userPasswordConfirm"  className='border border-gray-400 px-3 py-2 rounded-lg w-10/12 placeholder-gray-600' placeholder='Password Confirmation' />
                <button   className='bg-black text-white font-medium px-3 py-2 mt-4  rounded-lg w-10/12 placeholder-gray-600'>Create Account</button>
            </form>
            <p className='text-gray-500 text-sm'>Already have an account? <Link to="/login" className='text-black font-medium'>Login</Link></p>
        </div>
    </div>
    </>
  )
}

export default SignUp
