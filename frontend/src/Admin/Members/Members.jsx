import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SpinnerBlue from '../SpinnerBlue'
import { ArrowRight, ChevronDown, Plus, Trash2, UserRound, UserRoundX } from 'lucide-react'
import { Link } from 'react-router-dom';
import UpdateRole from './UpdateRole';
import DeleteMember from './DeleteMember';
import AddMember from './AddMember';


function Members() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [deletePopUp, setDeletePopUp] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null);
  const [addNewUser, setAddNewUser] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL;

  const getAllMembers = () => {
    axios.get(`${apiUrl}/all-users`)
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
    axios.get(`${apiUrl}/users/data`,
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
    getUserData()
  }, [])

  useEffect(() => {
    getAllMembers()
  // }, [members])
}, [])
  
  return (
    <div className='mb-20'>
        {
          loading 
          ?(
            <SpinnerBlue/>
          ):(
            <div>
              <div className='flex justify-between items-center'>
                <div className='flex'>
                  <p className='text-3xl font-medium mb-5 ml-1 mt-5 text-blue-500 font-poppins '>Members</p>
                  <p className='relative top-3 left-1 text-blue-500 font-semibold font-poppins'>{members.length} </p>
                </div>
                <div 
                  onClick={() => setAddNewUser(true)} 
                  className='bg-blue-600 px-3 py-2 cursor-pointer rounded-xl gap-1 text-white flex font-semibold justify-center items-center'
                >
                  <Plus/>
                  <p>Add New</p>
                </div>
                {addNewUser && <AddMember setAddNewUser={setAddNewUser} members={members} setMembers={setMembers} />}
              </div>
              <div className='grid lg:grid-cols-4 grid-cols-2 gap-5 w-full mt-7 '>
                {
                  members.length > 0 
                  ?(
                    members.map((user, index) => (
                      <div key={index} className="bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-800 cursor-pointer hover:shadow-xl rounded-2xl pb-6 pt-5 shadow-md border border-gray-300 lg:px-0 px-2 flex flex-col justify-center items-center ">
                        {/* <div className='w-full flex justify-end pr-2 py-2'>
                          <Link className='flex gap-1 items-center px-2 hover:text-white rounded-full hover:bg-gray-400'>Activity Log <ArrowRight size={18} /></Link>
                        </div> */}
                        <div className="bg-gray-200 overflow-hidden mb-4 w-20 h-20  m-auto flex justify-center items-center  rounded-full">
                          {
                            user.photo 
                            ?(
                              <img className='w-full h-full' src={`${apiUrl}${user.photo}`} alt='profile photo' />
                            ):(
                              <UserRound size={45} />
                            )
                          }
                        </div>
                        <div>
                          {user.role === "admin" && (
                            <div className='bg-blue-50 text-blue-600 flex justify-center items-center gap-1 rounded-xl px-1 lg:w-full w-full m-auto mb-3 text-sm'>
                              <div className='w-1.5 h-1.5 rounded-full bg-blue-500'></div>Admin
                            </div>
                          )}
                          {user.role === "member" && (
                            <div className='bg-green-50 text-green-600 flex justify-center items-center gap-1 rounded-xl px-2 lg:w-full w-full m-auto mb-3 text-sm'>
                              <div className='w-1.5 h-1.5 rounded-full bg-green-600'></div>Member
                            </div>
                          )}
                          {user.role === "client" && (
                            <div className='bg-purple-100 text-purple-600 flex justify-center items-center gap-1 rounded-xl px-2 lg:w-full w-full m-auto mb-3 text-sm'>
                              <div className='w-1.5 h-1.5 rounded-full bg-purple-600'></div>Client
                            </div>
                          )}
                        </div>
                        <div className="text-center flex items-center justify-center gap-1 lg:text-lg font-semibold text-gray-800">
                          {user.name}
                          {user.email === data.email && (<div className='text-base'>(You)</div>)}
                        </div>
                        <div className="text-center text-sm text-gray-500 mb-4">
                          {user.email}
                        </div>
                        <div className="flex gap-2 lg:w-11/12 lg:m-auto  justify-center items-center lg:px-4">
                          {user.email !== data.email && (
                            <>
                              {/* update member */}
                              <UpdateRole user={user} members={members} setMembers={setMembers} />
                              {/* Delete Member */}
                              <button 
                                  className="bg-red-500 hover:bg-red-600 text-white lg:px-4 lg:block flex justify-center items-center gap-1 px-2  m-auto py-2 rounded-xl transition-all duration-200"
                                  // onClick={() => setDeletePopUp(true)}
                                  onClick={() => setUserToDelete(user)}
                              >
                                  {/* <p className='lg:hidden '>Delete user</p> */}
                                  <Trash2/>
                              </button>
                              {userToDelete && <DeleteMember user={userToDelete} setDeletePopUp={() => setUserToDelete(null)} members={members} setMembers={setMembers} />}
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ):(
                    <div className="bg-white flex-col gap-3 rounded-2xl w-11/12 py-14 shadow-md font-poppins border border-blue-100 flex justify-center items-center text-gray-400">
                      <UserRoundX size={50} />
                      <p className="text-2xl font-semibold text-gray-400">No users found</p>
                      <div
                        onClick={() => setAddNewUser(true)} 
                        className='bg-blue-500 px-3 mt-5 py-2 rounded-xl gap-1 text-white flex font-semibold justify-center items-center'
                      >
                        <Plus/>
                        <p>Add member</p>
                      </div>
                      {addNewUser && <AddMember setAddNewUser={setAddNewUser} />}
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
