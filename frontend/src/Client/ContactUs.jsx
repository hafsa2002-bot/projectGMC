import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from './Footer'
import Nav from './NavBar/Nav'
import emailjs from '@emailjs/browser'
import SucessMessage from '../Admin/SucessMessage'

function ContactUs() {
    const [message, setMessage] = useState(false)
    const navigate = useNavigate()
    const sendEmail = (e) => {
        e.preventDefault();

        // emailjs.sendForm('service_fxfe5fd', 'template_a683oom', e.target, 'Lcg2d9RcX-okS49vi')
        emailjs.sendForm('service_fxfe5fd', 'template_a683oom', e.target, 'Lcg2d9RcX-okS49vi')
            .then((result) => {
                setMessage(true)
                setTimeout(() => setMessage(false), 2000)
                console.log('Email successfully sent:', result.text);
                navigate('/'); 
                window.scrollTo(0, 0)
            })
            .catch((error) => {
                console.error('Error sending email:', error.text);
                // alert("Failed to send message. Please try again.");
            });

    }
  return (
    <div>
        <Nav details={false} />
        <section className="w-full bg-black text-white py-16 px-6 md:px-12 lg:px-24 pt-32 pb-24">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-10">

            {/* Left: Contact Info */}
            <div className="flex-1">
                <h2 className="text-4xl font-bold mb-6">Contactez-nous</h2>
                <p className="text-stone-400 mb-6">
                    Vous avez des questions ou des commentaires ? Nous serions ravis de vous lire. Utilisez le formulaire ou contactez-nous directement.
                </p>
                <div className="space-y-4 text-stone-300">
                    <p><strong>E-mail:</strong> support@novexa.com</p>
                    <p><strong>Téléphone:</strong> +212 6 00 00 00 00</p>
                    <p><strong>Localisation:</strong> Casablanca, Maroc</p>
                </div>
            </div>

            {/* Right: Contact Form */}
            <form onSubmit={sendEmail} className="flex-1 bg-zinc-900 text-white rounded-xl shadow-md p-8 space-y-5">
                <div className="flex flex-col">
                    <label className="text-sm mb-1 text-stone-300">Nom</label>
                    <input 
                        type="text"
                        placeholder="Votre nom"
                        name="user_name"
                        className="bg-black border border-stone-600 rounded-md px-4 py-2 focus:outline-none focus:border-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm mb-1 text-stone-300">E-mail</label>
                    <input 
                        type="email"
                        name="email_from" 
                        placeholder="nom@exemple.com"
                        className="bg-black border border-stone-600 rounded-md px-4 py-2 focus:outline-none focus:border-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm mb-1 text-stone-300">Message</label>
                    <textarea 
                        rows="4" 
                        placeholder="Entrez votre message..."
                        name="message"
                        id="message"
                        className="bg-black border border-stone-600 rounded-md px-4 py-2 focus:outline-none focus:border-white"
                    ></textarea>
                </div>
                <button 
                    type="submit"
                    className="bg-white px-5 text-black py-2 rounded-md font-semibold hover:bg-stone-200 transition"
                >
                    Envoyer un message
                </button>
            </form>

        </div>
        </section>
        {message && (
            <SucessMessage message="Email envoyé avec succès" />
        )}
    </div>



  )
}

export default ContactUs
