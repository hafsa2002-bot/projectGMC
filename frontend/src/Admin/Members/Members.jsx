import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SpinnerBlue from '../SpinnerBlue'
import { ChevronDown, Plus, Trash2, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom';


function Members() {
  /*
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const getAllMembers = () => {
    axios.get("http://localhost:3003/user/all-members")
    .then(response => {
      setMembers(response.data)
      setLoading(false)
    })
    .catch(error => {
      console.log("Error: ", error)
      setLoading(false)
    })
  }
  useEffect(() => {
    getAllMembers()
  }, [members])
  */
  const members = [
    {
      name: "Ahmed Alali",
      email: "ahmed.alali@example.com",
      role: "admin"
    },
    {
      name: "Layla Mansour",
      email: "layla.mansour@example.com",
      role: "member"
    },
    {
      name: "Sami Aljabouri",
      email: "sami.aljabouri@example.com",
      role: "member"
    },
    {
      name: "Sami Aljabouri",
      email: "sami.aljabouri@example.com",
      role: "member"
    }
  ];
  
  return (
    <div>
        {/* {
          loading 
          ?(
            <SpinnerBlue/>
          ):( */}
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
                      /*
                      <div key={index} className='bg-white rounded-lg w-1/4 py-4 font-poppins '> 
                        <div className='bg-gray-100 mb-3  w-20 h-20 m-auto flex justify-center items-center  text-gray-400 rounded-full'>
                          <UserRound size={40} />
                        </div>
                        <div className='text-center'>
                          {user.name}
                        </div>
                        <div className='text-center mb-4'>
                          {user.email}
                        </div>
                        <div className='flex gap-2 justify-center mx-2'>
                          <div className='text-white bg-stone-700 px-2.5 py-2 rounded-lg flex justify-center items-center'> update role <ChevronDown/></div>
                          <div className='bg-red-400 text-white px-2.5 py-2 rounded-lg'>delete</div>
                        </div>
                      </div>
                      */
                      <div key={index} className="bg-white rounded-2xl w-1/4 py-6 shadow-md font-poppins border border-blue-100">
                        <div className="bg-gray-100 mb-4 w-20 h-20 m-auto flex justify-center items-center text-gray-500 rounded-full">
                          <UserRound size={40} />
                        </div>
                        <div className="text-center text-lg font-semibold text-gray-800">
                          {user.name}
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
                    <div>no mebers found</div>
                  )
                }
              </div>
            </div>
          {/* )
        } */}
    </div>
  )
}

export default Members
