import React from 'react'
import {Link} from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function ContactUs() {
  return (
    <div className=''>
        <Link to={"/"} className='flex gap-3 items-center border border-stone-400 hover:bg-black hover:text-white  w-44 rounded-full mt-5 ml-5 p-2'>
            <div><ArrowLeft/></div>
            <div className='text-lg font-semibold'><p>Back to Home</p></div>
        </Link>
        <div className='mt-2'>
            <div>
                {/* -[#b88c4a] */}
                <div className='text-5xl text-center  '>
                    <p>CONTACT US</p>
                    <div className='w-14 h-1 rounded-full mt-3 m-auto bg-black'></div>
                </div>
            </div>
            <div>
                <div className='w-1/2  m-auto mt-7 text-center font-semibold text-stone-700'>
                    <p>If you got any questions <br/> please do not hesitate to send us a message.</p>
                </div>
                <form className='flex flex-col w-5/12 m-auto gap-6 mt-4'>
                    <input type="text" name="nameContactUs" id="nameContactUs" placeholder='Your Name'
                        className='border border-black rounded-lg placeholder:text-stone-600 py-1.5 px-2 outline-none'/>
                    <input type="email" name="emailContactUs" id="emailContactUs" placeholder='Your Email' 
                        className='border border-black rounded-lg placeholder:text-stone-600 py-1.5 px-2 outline-none'/>
                    <input type="text" name="subjectCotactUs" id="subjectCotactUs" placeholder='Subject' 
                        className='border border-black rounded-lg placeholder:text-stone-600 py-1.5 px-2 outline-none'/>
                    <textarea name="messageContactUs" id="messageContactUs" cols="30" rows="5" placeholder='Message'
                        className='border border-black placeholder:text-stone-600 px-2 outline-none rounded-lg'>
                    </textarea>
                    <button className='bg-black text-white py-2.5  rounded-xl font-medium text-lg'>SEND MESSAGE</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ContactUs
