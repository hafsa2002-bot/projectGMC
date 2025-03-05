import React, {useState, useEffect} from 'react'
import { Instagram, Facebook, Twitter } from 'lucide-react'

function Footer() {
  return (
    <footer className=" flex flex-col mt-[200px] bg-black text-white items-center pt-7">
        <div className='flex justify-center gap-28 border-b w-10/12 pb-8'>
            <div>
                <div>
                    <p className='text-3xl font-semibold'>Novexa</p>
                    <p className='font-mono text-lg pt-3'>Where shopping dreams <br/> come true.</p>
                </div>
            </div>
            <div>
                <h3 className=' font-medium text-lg pb-1 mb-3 border-b-2 w-28'>Contact Info</h3>
                <ul className='footerList flex flex-col gap-1 text-stone-400'>
                    <li>Email: <a href='' className='no-underline text-[rgb(105, 105, 105)]'>support@novexa.com</a></li>
                    <li>Phone: +212 123-456-789</li>
                </ul>
            </div>
            <div>
                <h3 className=' font-medium text-lg pb-1 mb-3 border-b-2 pr-2'>Follow-us on Social Media</h3>
                <ul className='footerList socialMediaList flex flex-col justify-center gap-2 text-stone-400'>
                    <li><a className='no-underline text-[rgb(105, 105, 105)] flex items-center gap-2.5' href=''>< Instagram  className='text-stone-400' /> <span>Instagram</span></a></li>
                    <li><a className='no-underline text-[rgb(105, 105, 105)] flex items-center gap-2.5' href=''>< Facebook className='text-stone-400'/><span>Facebook</span></a></li>
                    <li><a className='no-underline text-[rgb(105, 105, 105)] flex items-center gap-2.5' href=''>< Twitter  className='text-stone-400' /><span>Twitter</span></a></li>
                </ul>
            </div>
        </div>
        <div className='bg-black w-full text-center text-stone-400 py-5'>
            <p>Copyright © 2025 Novexa. All Rights Reserved.</p>
        </div>
    </footer>
  )
}

export default Footer
