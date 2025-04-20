import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'; 
import { CirclePercent, Gem, Headphones, Laptop, Shirt, ShoppingCart, Star, StarHalf, Watch } from 'lucide-react';

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
      <section className='hidden lg:block'>
        <h1 className='text-6xl text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 font-extrabold relative top-5' data-aos="fade-up">ABOUT US</h1>
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
                  <Star fill="yellow"  strokeWidth={0} />
                  <Star fill="yellow" strokeWidth={0} />
                  <Star fill="yellow" strokeWidth={0} />
                  <Star fill="yellow" strokeWidth={0} />
                  <StarHalf fill="yellow" className='text-stone-900' strokeWidth={0} />
                </div>
              </div>
              <div className='p-4 text-2xl'>
                <span className='text-white'>Customer satisfaction </span><br/>is our top priority.
              </div>
            </div>
            <div className='h-2/3 text-2xl p-4 uppercase bg-black border border-stone-500 rounded-lg flex flex-col justify-between'>
              <div>
                Your<br/> <span className='text-white'>one-stop shop</span> for the latest trends<br/> & essentials
              </div>
              <div className='flex justify-center gap-6 pb-5 text-white'>
                  <Shirt fill='white'/>
                  <ShoppingCart/>
                  <Watch />
                  <Headphones  />
                  <CirclePercent/>
                  <Gem />
                  <Laptop />
              </div>
            </div>
          </div>
          <div className='w-2/3 flex flex-col gap-4'>
            <div className='h-2/3 pl-5 pt-5 relative flex bg-black shadow-lg border border-stone-500 rounded-lg overflow-hidden'>
              <div className='w-7/12 text-4xl '>
                Discover a world of<br/> 
                <span className='text-white'>quality products</span> <br/>
                at unbeatable prices
                <p className='text-sm mt-3'>Explore high-quality products at unbeatable prices, with something for everyone!</p>
              </div>
              <div className='w-10/12 absolute left-110 -top-8'>
                <img className='' src="/images/leonrdo2.png" alt="" />
              </div>
            </div>
            <div className='h-1/3 text-2xl p-7 text-white  bg-black shadow-lg border border-stone-500 rounded-lg'>
              Secure payments<br/> & fast delivery for a seamless experience.
            </div>
          </div>
          
        </div>
      </section>
      <section className='lg:hidden'>
  <h1 className='text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 font-extrabold relative top-5 px-6' data-aos="fade-up">
    ABOUT US
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
            <Star fill="yellow" strokeWidth={0} />
            <Star fill="yellow" strokeWidth={0} />
            <Star fill="yellow" strokeWidth={0} />
            <Star fill="yellow" strokeWidth={0} />
            <StarHalf fill="yellow" className='text-stone-900' strokeWidth={0} />
          </div>
        </div>
        <div className='text-2xl mt-4'>
          <span className='text-white'>Customer satisfaction </span><br/>is our top priority.
        </div>
      </div>
      
      {/* One-Stop Shop Section */}
      <div className='bg-black border border-stone-500 rounded-lg p-6'>
        <div className='text-xl'>
          Your<br/> <span className='text-white'>one-stop shop</span> for the latest trends<br/> & essentials
        </div>
        <div className='flex justify-around gap-4 mt-4 text-white'>
          <Shirt fill='white' className='w-10 h-10'/>
          <ShoppingCart className='w-10 h-10'/>
          <Watch className='w-10 h-10'/>
          <Headphones className='w-10 h-10'/>
          <CirclePercent className='w-10 h-10'/>
          <Gem className='w-10 h-10'/>
          <Laptop className='w-10 h-10'/>
        </div>
      </div>
      
    </div>

    {/* Right Side */}
    <div className='flex flex-col gap-6'>
      
      {/* Discover Quality Products Box */}
      <div className='bg-black shadow-lg border border-stone-500 rounded-lg p-6 relative'>
        <div className='text-2xl'>
          Discover a world of<br/> 
          <span className='text-white'>quality products</span> <br/>
          at unbeatable prices
        </div>
        <p className='text-sm mt-4'>Explore high-quality products at unbeatable prices, with something for everyone!</p>
        <img src="/images/leonrdo2.png" alt="Product" className="w-full mt-4 rounded-lg" />
      </div>
      
      {/* Secure Payments Section */}
      <div className='bg-black shadow-lg border border-stone-500 rounded-lg p-6 text-xl text-white'>
        Secure payments<br/> & fast delivery for a seamless experience.
      </div>
      
    </div>
    
  </div>
</section>


    </>


  
  )
}

export default AboutUs
