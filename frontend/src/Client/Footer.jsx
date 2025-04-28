import React, {useState, useEffect} from 'react'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
// import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'; // FontAwesome Icons


function Footer() {
  return (
    <>
    <footer className="flex flex-col w-full  bg-black text-white items-center pt-7">
        <div className='lg:flex  justify-center lg:gap-28 border-b lg:w-10/12 w-11/12 pb-8'>
            <div className='hidden'>
                <div>
                    <p className='text-4xl font-extrabold'>Novexa</p>
                    <p className='font-mono text-lg pt-3 text-gray-200'>Où vos courses deviennent <br/> simples et rapides.</p>
                </div>
            </div>
            <div className='flex mb-7 px-4'>
                <div>
                    <p className='text-4xl font-extrabold'>Novexa</p>
                    <p className='font-mono text-lg lg:pt-3 pt-1 text-gray-200'>Où vos courses deviennent simples et rapides.</p>
                </div>
            </div>
            <div className='flex lg:gap-28 gap-12 px-4 lg:px-0'>
                <div>
                    <h3 className="text-yellow-300 text-2xl font-semibold mb-4">Contactez-nous</h3>
                    <ul className='footerList flex flex-col gap-1 text-stone-400'>
                        <li>Email: <a href='' className='no-underline text-[rgb(105, 105, 105)] hover:text-white'>support@novexa.com</a></li>
                        <li>Phone: <br className='flex lg:hidden '/> <span className='hover:text-white'>+212 123-456-789</span> </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-yellow-300 text-2xl font-semibold mb-4">Suivez-nous</h3>
                    <div className='footerList flex socialMediaList  justify-startr gap-4 text-stone-400'>
                        <a href="https://www.instagram.com/hafssa_4748/?hl=fr" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-yellow-300 transition-all">
                            <FontAwesomeIcon icon={faInstagram} size="xl" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-yellow-300 transition-all">
                            <FontAwesomeIcon icon={faFacebook} size="xl" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-yellow-300 transition-all">
                            <FontAwesomeIcon icon={faTwitter} size="xl" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
        <div className='bg-black w-full text-center text-stone-400 py-5'>
            <p>Copyright © 2025 Novexa. Tous droits réservés.</p>
        </div>
    </footer>
    {/* <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 lg:px-16 flex flex-col lg:flex-row justify-between items-center lg:items-start">
        
        <div className="lg:w-1/3 text-center lg:text-left mb-8 lg:mb-0">
          <p className="text-4xl font-extrabold text-yellow-300">Novexa</p>
          <p className="mt-3 text-lg text-stone-400 font-mono">Où vos courses deviennent <br /> simples et rapides.</p>
        </div>
        
        <div className="lg:w-1/3 text-center lg:text-left mb-8 lg:mb-0">
          <h3 className="text-yellow-300 text-2xl font-semibold mb-4">Contactez-nous</h3>
          <ul className="space-y-2 text-stone-400">
            <li>
              <a href="mailto:support@novexa.com" className="hover:text-yellow-300 transition-all">support@novexa.com</a>
            </li>
            <li>
              <span className="hover:text-yellow-300 transition-all">+212 123-456-789</span>
            </li>
          </ul>
        </div>
        
        <div className="lg:w-1/3 text-center lg:text-left">
          <h3 className="text-yellow-300 text-2xl font-semibold mb-4">Suivez-nous</h3>
          <div className="flex justify-center lg:justify-start gap-6">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-yellow-300 transition-all">
              <faInstagram size={30} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-yellow-300 transition-all">
              <faFacebook size={30} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-yellow-300 transition-all">
              <faTwitter size={30} />
            </a>
            
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-yellow-300 transition-all">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-yellow-300 transition-all">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-yellow-300 transition-all">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-black text-center py-6 text-stone-400">
        <p>Copyright © 2025 Novexa. Tous droits réservés.</p>
      </div>
    </footer> */}
    </>
  )
}

export default Footer
