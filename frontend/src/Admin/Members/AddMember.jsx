import { ArrowLeft, ChevronLeft } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddMember() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [role, setRole] = useState("member")
    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(user.length > 0){
            setErrorMessage(true)
            setTimeout(() => setErrorMessage(false), 3000)
            return
        } 
        if(password !== passwordConfirmation){
            setPasswordError(true)
            setTimeout(() => setPasswordError(false), 2000)
            return
        }
        console.log("role: ", role)
        try{
            const response = await axios.post("http://localhost:3003/users/register", {
                name, email, password, role
            })
            setSuccessMessage(true)
            setTimeout(() => setSuccessMessage(false), 2000)
            setTimeout(() => navigate("/admin/members"), 3000)
        }catch(error){
            console.log("Error: ", error)
        }
    }

    const fetchData = () => {
        axios.get(`http://localhost:3003/user/${email}`)
            .then(response => setUser(response.data))
            .catch(error => console.log("Error: ", error))
    }
    useEffect(() => {
        fetchData()
    }, [email])
  return (
    <div className='mb-30'>
        {/* Title */}
        <h2 onClick={() => navigate(-1)} className="text-2xl cursor-pointer font-semibold text-gray-800 flex items-center ml-7 gap-1 mt-5 mb-10"> <ArrowLeft/>Add New Member</h2>
        <form
            onSubmit={handleSubmit} 
            className="bg-white w-10/12 ml-7 p-6 rounded-xl shadow-md border border-gray-200 font-poppins"
        >
            {/* Name */}
            <div className="mb-4">
                <label htmlFor="name" className="block  font-medium text-gray-700">Name</label>
                <input 
                type="text" 
                id="name" 
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)} 
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                placeholder="Enter member's full name" 
                required 
                />
            </div>

            {/* Email */}
            <div className="mb-4">
                <label htmlFor="email" className="block  font-medium text-gray-700">Email</label>
                <input 
                type="email" 
                id="email" 
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)} 
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                placeholder="Enter member's email" 
                required 
                />
            </div>

            {/* password */}
            <div className="mb-4">
                <label htmlFor="password" className="block  font-medium text-gray-700">Password</label>
                <input 
                type="password" 
                id="password" 
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} 
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                placeholder="Enter a password" 
                required 
                />
            </div>

            {/* password */}
            <div className="mb-4">
                <label htmlFor="email" className="block  font-medium text-gray-700">Password Confirmation</label>
                <input 
                type="password" 
                id="passwordConfirmation" 
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)} 
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                placeholder="Enter your password again" 
                required 
                />
            </div>

            {/* Role */}
            <div className="mb-4">
                <label htmlFor="role" className="block  font-medium text-gray-700">Role</label>
                <select 
                id="role" 
                name="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}  
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500" 
                required
                >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                Add Member
                </button>
            </div>
        </form>
        {successMessage && (
            <div className='bg-white fixed top-0 left-0 right-0 p-4 border-t-4 border-green-500 flex items-center justify-between shadow-lg'>
                <div className='flex items-center'>
                    <div className='w-4 h-4 bg-green-500 rounded-full mr-3'></div>
                    <p className='text-lg font-semibold text-gray-800'>Account created</p>
                </div>
            </div>
        )}
        {errorMessage && (
            <div className='bg-red-100 fixed top-0 left-0 right-0 p-4 border-t-4 border-red-500 flex items-center justify-between shadow-lg'>
                <div className='flex items-center'>
                    <div className='w-4 h-4 bg-red-500 rounded-full mr-3'></div>
                    <p className='text-lg font-semibold text-red-800'>This email is already associated with an account.</p>
                </div>
            </div>
        )}
        {passwordError && (
            <div className='bg-yellow-100 fixed top-0 left-0 right-0 p-4 border-t-4 border-yellow-500 flex items-center justify-between shadow-lg'>
                <div className='flex items-center'>
                    <div className='w-4 h-4 bg-yellow-500 rounded-full mr-3'></div>
                    <p className='text-lg font-semibold text-yellow-800'>Passwords do not match. Please try again.</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default AddMember
