import React from 'react'
import {Link} from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from './Footer'
import Nav from './NavBar/Nav'
import emailjs from '@emailjs/browser'

function ContactUs() {
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_fxfe5fd', 'template_id', e.target, 'public_key')

    }
  return (
    <div>
        <Nav details={false} />
        <section className="w-full bg-black text-white py-16 px-6 md:px-12 lg:px-24 pt-32 pb-24">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-10">

            {/* Left: Contact Info */}
            <div className="flex-1">
                <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
                <p className="text-stone-400 mb-6">
                    Have questions or feedback? We’d love to hear from you. Use the form or reach us directly.
                </p>
                <div className="space-y-4 text-stone-300">
                    <p><strong>Email:</strong> support@novexa.com</p>
                    <p><strong>Phone:</strong> +212 6 00 00 00 00</p>
                    <p><strong>Location:</strong> Casablanca, Morocco</p>
                </div>
            </div>

            {/* Right: Contact Form */}
            <form onSubmit={sendEmail} className="flex-1 bg-zinc-900 text-white rounded-xl shadow-md p-8 space-y-5">
                <div className="flex flex-col">
                    <label className="text-sm mb-1 text-stone-300">Name</label>
                    <input 
                        type="text"
                        placeholder="Your Name"
                        className="bg-black border border-stone-600 rounded-md px-4 py-2 focus:outline-none focus:border-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm mb-1 text-stone-300">Email</label>
                    <input 
                        type="email"
                        name="email_from" 
                        placeholder="you@example.com"
                        className="bg-black border border-stone-600 rounded-md px-4 py-2 focus:outline-none focus:border-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm mb-1 text-stone-300">Message</label>
                    <textarea 
                        rows="4" 
                        placeholder="Type your message..."
                        className="bg-black border border-stone-600 rounded-md px-4 py-2 focus:outline-none focus:border-white"
                    ></textarea>
                </div>
                <button 
                    type="submit"
                    className="bg-white px-5 text-black py-2 rounded-md font-semibold hover:bg-stone-200 transition"
                >
                    Send Message
                </button>
            </form>

        </div>
        </section>
    </div>



  )
}

export default ContactUs
