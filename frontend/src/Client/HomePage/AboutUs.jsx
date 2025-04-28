import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'; 
import { Apple, Candy, CirclePercent, Clock, Egg, Gem, Headphones, Laptop, Milk, Phone, Shirt, ShoppingBasket, ShoppingCart, Star, StarHalf, Tag, Truck, Watch } from 'lucide-react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBreadSlice, faEgg, faGlassWhiskey, faCheese, faAppleAlt, faCarrot, faShoppingBag, faCookieBite, faCandyCane } from '@fortawesome/free-solid-svg-icons';
function AboutUs() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out'
    })
    AOS.refresh()
  }, [])
  return (
    <>
      {/* laptop version */}
      <section className='hidden lg:block'>
        <h1 className='text-6xl text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 font-extrabold relative top-5' data-aos="fade-up">À PROPOS DE NOUS</h1>
        <div className='w-full  h-[90vh] px-26 py-20 flex gap-5 text-stone-400 font-semibold'>
          <div className='w-1/3 flex flex-col gap-4'>
            <div className='h-1/3 bg-black border border-stone-500 rounded-lg p-4'>
              <div className='relative flex justify-end'>
                <div className='flex gap-4'>
                  { Array.from({ length: 5 }, () => (
                    <Star fill="#6b7280" strokeWidth={0} />
                  ))}
                </div>
                <div className="flex gap-4 absolute top-0">
                  <Star fill="#FBBF24"  strokeWidth={0} />
                  <Star fill="#FBBF24" strokeWidth={0} />
                  <Star fill="#FBBF24" strokeWidth={0} />
                  <Star fill="#FBBF24" strokeWidth={0} />
                  <StarHalf fill="#FBBF24" className='text-stone-900' strokeWidth={0} />
                </div>
              </div>
              <div className='p-3 text-2xl'>
                <span className='text-white'>La satisfaction de nos clients </span><br/>est notre priorité principale.
              </div>
            </div>
            <div className='h-2/3 text-2xl p-4 text-white uppercase bg-black border border-stone-500 rounded-lg flex flex-col justify-between'>
              <div>
                Votre<br/> <span className='text-yellow-300'>épicerie en ligne</span> pour les produits essentiels<br/> et du quotidien.
              </div>
              
              <div className='flex justify-center gap-6 pb-5 text-white'>
                <FontAwesomeIcon icon={faBreadSlice} />
                <FontAwesomeIcon icon={faEgg} />
                <FontAwesomeIcon icon={faGlassWhiskey} />
                <FontAwesomeIcon icon={faCheese} />
                <FontAwesomeIcon icon={faCandyCane} />  
                <FontAwesomeIcon icon={faCookieBite} />
            </div>
            </div>
          </div>
          <div className='w-2/3 flex flex-col gap-4'>
            <div className='h-2/3 pl-5 pt-5 relative flex bg-black shadow-lg border border-stone-500 rounded-lg overflow-hidden'>
              <div className='w-7/12 text-4xl'>
                Découvrez un univers<br/> 
                <span className='text-white'>de produits de qualité</span> <br/>
                  à des prix exceptionnels
                <p className='text-base mt-3 text-gray-200'>Faites vos courses en ligne avec des produits de qualité à des prix incroyables, pour tous les besoins !</p>
              </div>
              <div className='w-10/12 absolute left-110 -top-8'>
                <img className='' src="/images/leonrdo2.png" alt="" />
              </div>
            </div>
            <div className='h-1/3 flex gap-28  text-2xl p-7 text-white bg-black shadow-lg  border-stone-500 rounded-lg'>
              <p className=''>Livraison rapide<br/> pour une expérience fluide.</p>
            </div>
          </div>
          
        </div>
      </section>
      {/* phone */}
      <section className='lg:hidden'>
        <h1 className='text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 font-extrabold relative top-5 px-6' data-aos="fade-up">
          À PROPOS DE NOUS
        </h1>
        
        <div className='w-full h-auto px-6 py-8 flex flex-col gap-8 text-stone-400 font-semibold'>
          
          {/* Left Side */}
          <div className='flex flex-col gap-6'>
            
            {/* Customer Satisfaction Box */}
            <div className='bg-black border border-stone-500 rounded-lg p-6'>
              <div className='relative flex justify-end items-center'>
                <div className='flex gap-2'>
                  {Array.from({ length: 5 }, () => (
                    <Star fill="#6b7280" strokeWidth={0} />
                  ))}
                </div>
                <div className="absolute flex gap-2">
                  <Star fill="#FBBF24" strokeWidth={0} />
                  <Star fill="#FBBF24" strokeWidth={0} />
                  <Star fill="#FBBF24" strokeWidth={0} />
                  <Star fill="#FBBF24" strokeWidth={0} />
                  <StarHalf fill="#FBBF24" className='text-stone-900' strokeWidth={0} />
                </div>
              </div>
              <div className='text-2xl mt-4'>
                <span className='text-white'>La satisfaction de nos clients </span><br/>est notre priorité principale.
              </div>
            </div>
            
            {/* One-Stop Shop Section */}
            <div className='bg-black border border-stone-500 rounded-lg p-6'>
              <div className='text-2xl uppercase text-white'>
                Votre<br/> <span className='text-yellow-300'>épicerie en ligne</span> pour les produits essentiels<br/> et du quotidien.
              </div>
              <div className='flex justify-around gap-4 mt-4 text-white'>
                <FontAwesomeIcon icon={faBreadSlice} size={'xl'} />
                <FontAwesomeIcon icon={faEgg}  size={'xl'}/>
                <FontAwesomeIcon icon={faGlassWhiskey} size={'xl'} />
                <FontAwesomeIcon icon={faCheese} size={'xl'} />
                <FontAwesomeIcon icon={faCandyCane} size={'xl'} />  
                <FontAwesomeIcon icon={faCookieBite} size={'xl'} />
              </div>
            </div>
            
          </div>

          {/* Right Side */}
          <div className='flex flex-col gap-6'>
            
            {/* Discover Quality Products Box */}
            <div className='bg-black overflow-hidden shadow-lg pb-6 border border-stone-500 rounded-lg px-4 pt-6 relative'>
              <div className='text-3xl'>
                Découvrez un univers<br/> 
                <span className='text-white'>de produits de qualité</span> <br/>
                à des prix exceptionnels
              </div>
              <p className='text-sm mt-4 w-9/12 '>Faites vos courses en ligne avec des produits de qualité à des prix incroyables, pour tous les besoins !</p>
              <div className='w-52 h-52 absolute left-52 bottom-0  top-24'>
                <img src="/images/leonrdo2.png" alt="Product" className="w-full  mt-4 rounded-lg" />
              </div>
            </div>
            
            {/* Secure Payments Section */}
            <div className='bg-black shadow-lg border border-stone-500 rounded-lg p-6 text-xl text-white'>
              Livraison rapide<br/> pour une expérience fluide.            
            </div>
          </div>
          
        </div>
      </section>
    </>
  )
}

export default AboutUs
