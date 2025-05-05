import React, {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Nav from '../NavBar/Nav';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import Footer from '../Footer';
import SpinnerLoader from '../../SpinnerLoader';
import AboutUs from './AboutUs';
import { ArrowRight, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../../CartContext';


function HomePage() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const {currency} = useCart()

    const fetchData = () => {
        const categoryName = "Mobile Accessories"
        
        axios.get(`http://localhost:3003/admin/items/sort-best-selling`)
            .then(response => {
                setProducts(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    };
    

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <>
        <Nav details={false} />
        <main className="lg:mt-16 mt-20">
            {/* Hero Section */}
            <section className="relative hidden lg:flex h-[90vh] items-center justify-center bg-cover bg-center bg-[url('/5ded84aab41bea08a7059b6f07644b1c.jpg')]">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <div className="relative z-10 flex items-center justify-between w-11/12 max-w-6xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-12 py-10 shadow-xl">
                    <div className="flex flex-col gap-6 text-white max-w-xl">
                    <h1 className="text-4xl font-extrabold font-poppins tracking-wide leading-snug">
                        Bienvenue dans votre <span className="text-yellow-400">Épicerie</span> en ligne
                    </h1>
                    <p className="text-base text-gray-200 font-poppins">
                        Faites vos courses en toute simplicité. Tout ce dont vous avez besoin — snacks, boissons, et bien plus — livré rapidement et facilement.
                    </p>
                        <Link to="/products" className="group w-fit inline-block">
                            <div className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400  text-black  px-10 py-3 rounded-full font-bold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center justify-center gap-2">
                                    <p className="group-hover:translate-x-[-10px] transition-transform duration-300 text-lg">
                                        Découvrir
                                    </p>
                                    <ShoppingCart 
                                        className="w-6 h-6 absolute opacity-0 group-hover:opacity-100 transition-all duration-300" 
                                        strokeWidth={2}
                                        style={{ right: '18px' }} // Adjust this value to fine-tune icon position
                                    />
                                </div>
                            </div>
                        </Link>
                        
                    </div>

                    {/* Right Image */}
                    <div className="hidden md:block">
                        <img
                            src="/a-man-with-a-grocery-bag-1.png"
                            alt="Shopping Guy"
                            className="w-[360px] h-[360px] object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* hero section : phone version */}
            <section className="relative top-6 pt-6  lg:hidden h-[90vh] items-center justify-center bg-cover bg-center bg-[url('/5ded84aab41bea08a7059b6f07644b1c.jpg')]">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <div className="relative z-10 flex flex-col m-auto lg:flex-row  items-center justify-center w-11/12 max-w-6xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-2 pb-2 pt-7 md:px-12 md:py-6 shadow-xl">
                    <div className="flex flex-col gap-5 text-white max-w-xl text-center lg:text-left">
                    <h1 className="text-3xl font-extrabold font-poppins tracking-wide leading-snug">
                        Bienvenue dans votre <span className="text-yellow-400">Épicerie</span> en ligne
                    </h1>
                    <p className="text-base text-gray-200 font-poppins">
                        Snacks, boissons et plus, livrés rapidement pour vous simplifier la vie.
                    </p>
                        <Link
                            to="/products"
                            className="w-fit flex items-center justify-center  gap-2 bg-gradient-to-r m-auto from-yellow-300 via-yellow-400 to-orange-400 text-black text-lg px-6 py-3 rounded-full font-bold shadow-md hover:brightness-110 transition"
                        >
                            Découvrir <ArrowRight strokeWidth={2} className='w-6 h-6'/>
                        </Link>
                    </div>
                    <div className="mt-3 lg:mt-0 md:hidden">
                        <img
                            src="/a-man-with-a-grocery-bag-1.png"
                            alt="Shopping Guy"
                            className="w-[300px] h-[300px] object-contain mx-auto"
                        />
                    </div>
                </div>
            </section>

            {/* Product Carousel Section */}
            <section className="lg:w-10/12 w-11/12 m-auto lg:my-12 mb-7 mt-20 flex flex-col justify-center">
                <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 lg:text-5xl text-3xl font-extrabold uppercase tracking-wide lg:mb-10 mb-4 drop-shadow-sm font-poppins">
                    Produits populaires
                </h2>

                {products && products.length > 4 ? (
                <Swiper
                    slidesPerView={2}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
                    pagination={{ clickable: true }}
                    breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    }}
                    className="w-full"
                    onSwiper={(swiper) => swiper.autoplay.start()}
                >
                    {products?.slice(0, 10).map((product) => (
                        <SwiperSlide key={product._id} className="text-center flex flex-col  items-center py-6 pb-8">
                            <Link to={`/products/${product._id}`} className="border border-stone-300 bg-white p-4 shadow-lg rounded-lg flex flex-col justify-between h-full">
                                <img
                                    src={`http://localhost:3003${product.productPhoto}`}
                                    alt={product.productName}
                                    className="w-full lg:h-60 object-cover rounded-lg mb-4 p-5"
                                />
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">{product.productName}</h3>
                                    <p className="text-xl font-bold text-yellow-500">
                                        {product.price} <span className="text-base font-medium ">{currency}</span>
                                    </p>                                
                                </div>   
                            </Link>
                        </SwiperSlide> 
                    ))}
                </Swiper>
                ) : (
                    <SpinnerLoader/>
                )}
            </section>
            <AboutUs/>
        </main>
        <div className='mt-20'>
            <Footer/>
        </div>
    </>
  )
}

export default HomePage
