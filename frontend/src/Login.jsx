import React, { useState, useEffect } from 'react'
import { UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [errorMessage, setErrorMessage] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async(event) => {
    event.preventDefault()

    if(user.length == 0){
      setErrorMessage(true)
      setTimeout(() => setErrorMessage(false), 3000)
      return
    } 

    try{
        const response = await axios.post(`${apiUrl}/users/login`, {
            email, 
            password
        })
        console.log("Login success: ", response.data)

        // Save token to localStorage
        const token = response.data.token
        localStorage.setItem("token", token)

        const decoded = jwtDecode(token)
        //redirect based on role
        if(decoded.role === "admin" || decoded.role === "member"){
            navigate("/admin")
        }
        else {
            navigate("/")
        }
    }catch(error){
        console.log("error: ", error)
    }
}
  const fetchData = () => {
    axios.get(`${apiUrl}/user/${email}`)
        .then(response => setUser(response.data))
        .catch(error => console.log("Error: ", error))
  }
  useEffect(() => {
    fetchData()
  }, [email])

  return (
    <>
      <div className="flex flex-col items-center justify-center lg:h-screen min-h-screen lg:gap-20 gap-16  lg:bg-[url('https://brandio.io/envato/iofrm/html/images/graphic8.svg')] lg:bg-[500px_auto] bg-[410px_auto] bg-no-repeat bg-center">
        <div className='flex items-center gap-2 lg:mb-2 mb-7'>
            <div className='h-15 overflow-hidden'><img src="/images/newLogo5.png" className='w-full h-full' alt="Logo" /></div>
            <h2 className='font-bold text-5xl text-black '>Novexa</h2>
        </div>
        <div className='shadow-2xl lg:w-96 w-10/12 rounded-xl  bg-white flex flex-col items-center pb-7 lg:pb-5 relative bottom-9'>
            <div className='bg-black w-16 h-16 rounded-full flex justify-center items-center relative bottom-6'>
                <UserRound color='white' size = {38} />
            </div>
            <h1 className='text-3xl font-bold '>LogIn</h1>
            <p className='text-gray-900 lg:w-auto w-10/12 text-center  lg:mt-0 mt-2'>Welcome back! Please enter your details</p>
            <form
              onSubmit={handleSubmit} 
              className=' w-9/12 flex flex-col items-center mt-7 mb-4' action="" method="post">
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="off" 
                  className='border border-gray-400 px-3 py-2 rounded-lg lg:w-10/12 w-full placeholder-gray-600' 
                  placeholder='User Mail'
                />
                <br/>
                <input 
                  type="password" 
                  name="password" 
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="off"  
                  className='border border-gray-400 px-3 py-2 rounded-lg lg:w-10/12 w-full placeholder-gray-600' 
                  placeholder='Password' 
                />
                <button
                  type="submit" 
                  className='bg-black text-white font-medium px-3 py-2 mt-4  rounded-lg lg:w-10/12 w-full placeholder-gray-600'
                >
                  Log In
                </button>
            </form>
            {/* <p className='text-gray-500 text-sm'>Don't have an account? <Link to="/signUp" className='text-black font-medium'>Sign up</Link></p> */}
        </div>
    </div>
    {errorMessage && (
          <div className='bg-red-100 fixed top-0 left-0 right-0 p-4 border-t-4 border-red-500 flex items-center justify-between shadow-lg'>
              <div className='flex items-center'>
                  <div className='w-4 h-4 bg-red-500 rounded-full mr-3'></div>
                  <p className='text-lg font-semibold text-red-800'>This Account doesn't exist.</p>
              </div>
          </div>
      )}
    </>
  )
}

export default Login
