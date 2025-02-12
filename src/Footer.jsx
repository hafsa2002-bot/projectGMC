import React from 'react'
import './Footer.css'
import { Instagram, Facebook, Twitter } from 'lucide-react'

function Footer() {
  return (
    <footer>
            <div>
                <div>
                    <h3>Navigation Links</h3>
                    <ul className='footerList'>
                        <li><a href=''>Home</a></li>
                        <li><a href=''>About Us</a></li>
                        <li><a href=''>Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Contact Info</h3>
                    <ul className='footerList'>
                        <li>Email: <a href=''>support@novexa.com</a></li>
                        <li>Phone: +212 123-456-789</li>
                    </ul>
                </div>
                <div>
                    <h3>Follow-us on Social Media</h3>
                    <ul className='footerList socialMediaList'>
                        <li><a className='instaLink' href=''>< Instagram color="white" /> <span>Instagram</span></a></li>
                        <li><a className='fbLink' href=''>< Facebook color="white" /><span>Facebook</span></a></li>
                        <li><a className='twitterLink' href=''>< Twitter  color="white" /><span>Twitter</span></a></li>
                    </ul>
                </div>
            </div>
            <div>
                <p>Copyright © 2025 Novexa. All Rights Reserved.</p>
            </div>
        </footer>
  )
}

export default Footer
