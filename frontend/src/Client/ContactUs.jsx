import React from 'react'
import {Link} from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from './Footer'

function ContactUs() {
  return (
    <div className=''>
        {/* laptop version */}
        <Link to={"/"} className='lg:flex hidden gap-3 items-center border border-stone-400 hover:bg-black hover:text-white  w-44 rounded-full mt-5 ml-5 p-2'>
            <div><ArrowLeft/></div>
            <div className='text-lg font-semibold'><p>Back to Home</p></div>
        </Link>
        {/* phone version */}
        <Link to={"/"} className='flex lg:hidden gap-3 items-center border border-stone-400 w-32 rounded-full mt-5 ml-5 p-2'>
            <div><ArrowLeft/></div>
            <div className='text-lg font-semibold'><p>Home</p></div>
        </Link>
        <div className='lg:mt-2 mt-6 min-h-screen'>
            <div className=''>
                {/* -[#b88c4a] */}
                <div className='text-5xl text-center '>
                    <p>CONTACT US</p>
                    <div className='w-14 h-1 rounded-full mt-3 m-auto bg-black'></div>
                </div>
            </div>
            <div>
                <div className=' lg:w-1/2  m-auto lg:mt-3 mt-7 text-center text-gray-500'>
                    <p>If you got any questions <br/> please do not hesitate to send us a message.</p>
                </div>
                <form className='flex flex-col lg:w-5/12 w-10/12 m-auto lg:gap-6 gap-4 mt-7'>
                    <div className='lg:flex block  justify-between items-center  gap-3'>
                        <input type="text" name="nameContactUs" id="nameContactUs" placeholder='Your Name'
                            className=' lg:w-1/2 h-11 w-full border  border-gray-500  rounded-full placeholder:text-stone-600 lg:py-1.5 py-2 px-4 outline-none'/>
                        <input type="email" name="emailContactUs" id="emailContactUs" placeholder='Your Email' 
                            className='lg:w-1/2 h-11 w-full border lg:mt-0 mt-4 border-gray-500 rounded-full placeholder:text-stone-600 lg:py-1.5 py-2  px-4 outline-none'/>
                    </div>
                    <input type="text" name="subjectCotactUs" id="subjectCotactUs" placeholder='Subject' 
                        className='border h-11 border-gray-500  rounded-full placeholder:text-stone-600 lg:py-1.5 py-2 px-4 outline-none'/>
                    <textarea name="messageContactUs" id="messageContactUs" cols="30" rows="5" placeholder='Message'
                        className='border  border-gray-500 placeholder:text-stone-600  px-4 outline-none  pt-2 rounded-3xl'>
                    </textarea>
                    <button className='bg-black text-white py-2.5  rounded-full  text-lg lg:w-3/12 w-32 '>Send</button>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ContactUs
