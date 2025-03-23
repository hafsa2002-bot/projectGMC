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
    <section>
      <h1 className='text-8xl text-center font-bold relative top-5' data-aos="fade-up">ABOUT US</h1>
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
              {/* <div className='flex flex-col gap-5 mt-6'>
                <div className='flex gap-10 justify-center'>
                  <Shirt className='relative top- left-7' fill='#9e9e9e'/>
                  <ShoppingCart className='relative bottom-2 left-10'/>
                  <Watch className='relative top-5 left-8' />
                  <Headphones  className='relative bottom-0 left-8' />
                </div>
                <div className='flex gap-10 justify-center'>
                  <CirclePercent className='relative top-4 right-4'/>
                  <Gem className='relative top-2 left-' />
                  <Laptop className='relative top-8 left-5' />
                </div>
              </div> */}
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
        <p className="text-4xl text-center">About US</p>
        <p>Welcome to <strong>Novexa</strong>, your one-stop online store dedicated
            to offering high-quality products that meet your everyday 
            needs. We are committed to providing a seamless shopping 
            experience with a diverse range of items, ensuring you find 
            exactly what you're looking for.
            At <strong>Novexa</strong>, we believe in innovation, convenience, and customer
            satisfaction. Whether you're searching for the latest trends, 
            essential items, or unique finds, our platform is designed to 
            make online shopping effortless and enjoyable.
        </p>
        <i className='font-semibold'>Join Novexa today and discover a world of possibilities at your fingertips!</i>
    </section>
  )
}

export default AboutUs
