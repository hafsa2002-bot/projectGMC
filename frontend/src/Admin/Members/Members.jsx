import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SpinnerBlue from '../SpinnerBlue'
import { ArrowRight, ChevronDown, Plus, Trash2, UserRound, UserRoundX } from 'lucide-react'
import { Link } from 'react-router-dom';


function Members() {

  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const getAllMembers = () => {
    axios.get("http://localhost:3003/all-users")
    .then(response => {
      setMembers(response.data)
      setLoading(false)
    })
    .catch(error => {
      console.log("Error: ", error)
      setLoading(false)
    })
  }
  const getUserData = () => {
    axios.get("http://localhost:3003/users/data",
      {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }}
    )
      .then(response => {
        setData(response.data)
        console.log("data: ", response.data)
      })
      .catch(error => console.log("Error: ", error))
  }
  useEffect(() => {
    getAllMembers()
    getUserData()
  }, [])
  
  return (
    <div>
        {
          loading 
          ?(
            <SpinnerBlue/>
          ):(
            <div>
              <div className='flex justify-between items-center'>
                <div className='flex'>
                  <p className='text-3xl font-medium mb-7 ml-7 mt-5 text-blue-500 font-poppins '>Members</p>
                  <p className='relative top-3 left-1 text-blue-500 font-semibold font-poppins'>{members.length} </p>
                </div>
                <Link to="/admin/add-member" className='bg-blue-600 px-3 py-2 rounded-xl gap-1 text-white flex font-semibold justify-center items-center'>
                  <Plus/>
                  <p>Add New</p>
                </Link>
              </div>
              <div className='flex gap-6 ml-7 mt-10'>
                {
                  members.length > 0 
                  ?(
                    members.map((user, index) => (
                      <div key={index} className="bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-800 cursor-pointer hover:shadow-xl rounded-2xl w-1/4 pb-6 pt-3 shadow-md font-poppins border border-gray-300">
                        <div className='w-full flex justify-end pr-2 py-2'>
                          <Link className='flex gap-1 items-center px-2 hover:text-white rounded-full hover:bg-gray-400'>Activity Log <ArrowRight size={18} /></Link>
                        </div>
                        <div className="bg-gray-200 mb-4 w-20 h-20 m-auto flex justify-center items-center  rounded-full">
                          <UserRound size={45} />
                        </div>
                        <div>
                          {user.role === "admin" && (
                            <div className='bg-blue-50 text-blue-600 flex justify-center items-center gap-1 rounded-xl px-1 w-1/4 m-auto mb-3 text-sm'>
                              <div className='w-1.5 h-1.5 rounded-full bg-blue-600'></div>Admin
                            </div>
                          )}
                          {user.role === "member" && (
                            <div className='bg-green-50 text-green-600 flex justify-center items-center gap-1 rounded-xl px-2 w-4/12 m-auto mb-3 text-sm'>
                              <div className='w-1.5 h-1.5 rounded-full bg-green-600'></div>Member
                            </div>
                          )}
                          {user.role === "client" && (
                            <div className='bg-purple-100 text-purple-600 flex justify-center items-center gap-1 rounded-xl px-2 w-1/4 m-auto mb-3 text-sm'>
                              <div className='w-1.5 h-1.5 rounded-full bg-purple-600'></div>Client
                            </div>
                          )}
                        </div>
                        <div className="text-center flex items-center justify-center gap-1 text-lg font-semibold text-gray-800">
                          {user.name}
                          {user.email === data.email && (<div className='text-base'>(You)</div>)}
                        </div>
                        <div className="text-center text-sm text-gray-500 mb-4">
                          {user.email}
                        </div>
                        <div className="flex gap-3 justify-center px-4">
                          <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl flex items-center gap-1 transition-all duration-200">
                            Update Role <ChevronDown className="w-5 h-5" />
                          </button>
                          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-200">
                            <Trash2/>
                          </button>
                        </div>
                      </div>
                    ))
                  ):(
                    <div className="bg-white flex-col gap-3 rounded-2xl w-11/12 py-14 shadow-md font-poppins border border-blue-100 flex justify-center items-center text-gray-400">
                      <UserRoundX size={50} />
                      <p className="text-2xl font-semibold text-gray-400">No users found</p>
                      <Link to="/admin/add-member" className='bg-blue-500 px-3 mt-5 py-2 rounded-xl gap-1 text-white flex font-semibold justify-center items-center'>
                        <Plus/>
                        <p>Add member</p>
                      </Link>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
    </div>
  )
}

export default Members
