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
import { ShoppingCart } from 'lucide-react';


function HomePage() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    // Fetch Categories and Random Products
    /*
    const fetchData = async () => {
        try {
            // Fetch categories
            const categoriesResponse = await axios.get(
                "https://dummyjson.com/products/categories"
            );
            const categorieList = categoriesResponse.data;
            setCategories(categorieList);
        
            console.log("Categories:", categoriesResponse.data);
        
            // Fetch products from the 'mobile-accessories' category
            const productsResponse = await axios.get(
                "https://dummyjson.com/products/category/mobile-accessories?limit=10&select=title,price,images"
            );
            setProducts(productsResponse.data.products);
        
            console.log("Mobile Accessories Products:", productsResponse.data.products);
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    };
    */
    const fetchData = () => {
        const categoryName = "Mobile Accessories"
        
        axios.get(`http://localhost:3003/category/${encodeURIComponent(categoryName)}`)
            .then(response => {
                setCategory(response.data)
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
            {/* laptop version : italian-pasta-cooking.jpg */}
            {/* hero section 1 */}
            {/* <section className="lg:flex hidden   h-[80vh] rounded-xl m-auto w-11/12 p-9">
                <div className="w-1/2 flex flex-col gap-2 justify-center">
                    <h1 className="text-5xl font-bold font-poppins uppercase tracking-wide">
                        Your One-Stop Shop,<br /> Delivered to You!
                    </h1>
                    <p className="text-lg w-9/12 mt-4 font-poppins">
                        Discover your favorite snacks, drinks, and everyday essentials—all in one place, making life easier and more convenient.
                    </p>
                    
                    <Link
                        to={"/products"}
                        className="text-center bg-gradient-to-r w-52 from-yellow-300 via-yellow-500  to-orange-400  px-4 py-2 rounded-lg text-lg font-semibold mt-5"
                    >
                        Start Shopping
                    </Link>
                </div>
                <div className="ml-20 rounded-xl overflow-hidden w-[460px] h-[460px]">
                    <img className="w-full h-full" src="images/fotor-ai-2025032994612.jpg" alt="Hero" />
                </div>
            </section>  */}
            {/* hero section 2 */}
            {/* <section className="relative lg:flex hidden h-[80vh] text-white rounded-xl m-auto w-full bg-contain bg-[url('/5ded84aab41bea08a7059b6f07644b1c.jpg')]">
                <div className='absolute top-0 w-full bg-black h-[80vh] opacity-80'></div>
                <div className='flex  items-center h-full absolute px-14 py-6'>
                    <div className=" w-1/2 flex flex-col gap-2 justify-center">
                        <h1 className="text-5xl font-bold font-poppins uppercase tracking-wide">
                            Your One-Stop Shop,<br /> Delivered to You!
                        </h1>
                        <p className="text-lg w-9/12  mt-4 font-poppins">
                            Discover your favorite snacks, drinks, and everyday essentials—all in one place, making life easier and more convenient.
                        </p>
                        
                        <Link
                            to={"/products"}
                            className="text-center bg-gradient-to-r w-52 from-yellow-300 via-yellow-500  to-orange-400  px-4 py-2 rounded-lg text-lg font-semibold mt-5"
                        >
                            Start Shopping
                        </Link>
                    </div>
                    <img className="relative top-6 ml-20 w-[460px] h-[460px]" src="/a-man-with-a-grocery-bag-1.png" alt="Hero" />
                </div>
            </section> */}
            <section className="relative hidden lg:flex h-[90vh] items-center justify-center bg-cover bg-center bg-[url('/5ded84aab41bea08a7059b6f07644b1c.jpg')]">
                {/* Blurred dark overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                {/* Glass-like content box */}
                <div className="relative z-10 flex items-center justify-between w-11/12 max-w-6xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-12 py-10 shadow-xl">
                    
                    {/* Left Content */}
                    <div className="flex flex-col gap-6 text-white max-w-xl">
                        <h1 className="text-4xl font-extrabold font-poppins tracking-wide leading-snug">
                            Welcome to Your <span className="text-yellow-400">Ultimate</span> Store
                        </h1>
                        <p className="text-base text-gray-200 font-poppins">
                            Shop smart. Shop fast. Everything you need — snacks, drinks, and more — delivered with care and convenience.
                        </p>
                        {/* <Link
                            to="/products"
                            className="w-fit bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:brightness-110 transition"
                        >
                            Browse Products
                        </Link> */}
                        {/* <Link to="/products" className=" group w-fit">
                            <div className="w-fit bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 hover:from-yellow-500 hover:via-orange-500 hover:to-orange-600 text-black hover:text-white px-6 py-3 rounded-full font-bold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2">
                                <p>Browse Products</p>
                                <ShoppingCart className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={2}  />
                            </div>
                        </Link> */}
                        <Link to="/products" className="group w-fit inline-block">
                            <div className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 hover:from-yellow-500 hover:via-orange-500 hover:to-orange-600 text-black hover:text-white px-8 py-3 rounded-full font-bold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center justify-center gap-2">
                                <p className="group-hover:translate-x-[-10px] transition-transform duration-300">
                                    Browse Products
                                </p>
                                <ShoppingCart 
                                    className="w-6 h-6 absolute opacity-0 group-hover:opacity-100 transition-all duration-300" 
                                    strokeWidth={2}
                                    style={{ right: '12px' }} // Adjust this value to fine-tune icon position
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
                        {/* <img
                            src="/images/home1.png"
                            alt="Shopping Guy"
                            className="w-[360px] h-[360px] object-contain"
                        /> */}
                    </div>
                </div>
            </section>
            {/* hero section 4 */}
            {/* <section className="relative lg:flex hidden overflow-hidden h-[80vh]  m-auto mt-10 w-full bg-contain ">
                <div className='flex  items-center h-full absolute px-14 py-6'>
                    <div className=" w-1/2 flex flex-col gap-2 justify-center">
                        <h1 className="text-5xl font-bold font-poppins uppercase tracking-wide">
                            Your One-Stop Shop,<br /> Delivered to You!
                        </h1>
                        <p className="text-lg w-9/12  mt-4 font-poppins">
                            Discover your favorite snacks, drinks, and everyday essentials—all in one place, making life easier and more convenient.
                        </p>
                        
                        <Link
                            to={"/products"}
                            className="text-center bg-gradient-to-r w-52 from-yellow-300 via-yellow-500  to-orange-400  px-4 py-2 rounded-lg text-lg font-semibold mt-5"
                        >
                            Start Shopping
                        </Link>
                    </div>
                    <div className=" relative top-7  ml-20 overflow-hidden  rounded-full p-14 bg-yellow-100 w-[580px] h-[580px]">
                        <img className="w-full h-full" src="/a-man-with-a-grocery-bag-1.png" alt="Hero" />
                    </div>
                </div>
            </section> */}
            {/* hero section 5  */}
            {/* <section className="lg:flex hidden mt-10  h-[80vh] rounded-xl m-auto w-full justify-between px-16 py-6">
                <div className="w-1/2 flex flex-col gap-2 justify-center">
                    <h1 className="text-5xl font-bold font-poppins uppercase tracking-wide">
                        Your One-Stop Shop,<br /> Delivered to You!
                    </h1>
                    <p className="text-lg w-9/12 mt-4 font-poppins">
                        Discover your favorite snacks, drinks, and everyday essentials—all in one place, making life easier and more convenient.
                    </p>
                    
                    <Link
                        to={"/products"}
                        className="text-center bg-gradient-to-r w-52 from-yellow-300 via-yellow-500  to-orange-400  px-4 py-2 rounded-lg text-lg font-semibold mt-5"
                    >
                        Start Shopping
                    </Link>
                </div>
                <div>
                    <div className="ml-20 relative w-[400px] h-[400px]">
                        <img className="absolute rotate-4 z-20 w-full h-full" src="images/fotor-ai-2025032994612.jpg" alt="Hero" />
                        <div className='absolute z-10 bg-yellow-400 w-full h-full '></div>
                    </div>
                </div>
            </section>  */}


            {/* phone version  */}
            {/* <section className="relative display lg:hidden m-auto w-full h-[487px]  bg-contain bg-[url('/photoAI1.jpg')]">
                <div className='absolute bg-black h-[487px] opacity-40 w-full '></div>
                <div className=" absolute h-full  flex text-white pt-16 flex-col gap-2 justify-center items-center">
                    <h1 className="text-5xl font-extrabold text-center uppercase tracking-wide">
                        Shop Smart.<br /> Shop Stylish.
                    </h1>
                    <p className="text-xl w-10/12 mt-4 text-center">
                        Discover a world of fashion, electronics, home essentials, and
                        more – all in one place.<br /> Shop quality, shop convenience.
                    </p>
                    <Link
                        to={"/products"}
                        className="text-center  bg-gradient-to-r w-52 from-yellow-300 via-yellow-500  to-yellow-600  px-4 py-3 rounded-full text-xl font-semibold mt-5"
                    >
                        Start Shopping
                    </Link>
                </div>
            </section> */}
            <section className="relative top-6 pt-6  lg:hidden h-[90vh] items-center justify-center bg-cover bg-center bg-[url('/5ded84aab41bea08a7059b6f07644b1c.jpg')]">
                {/* Blurred dark overlay */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                {/* Glass-like content box */}
                    <div className="relative z-10 flex flex-col m-auto lg:flex-row  items-center justify-center w-11/12 max-w-6xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 pb-2 pt-7 md:px-12 md:py-6 shadow-xl">
                        {/* Left Content */}
                        <div className="flex flex-col gap-5 text-white max-w-xl text-center lg:text-left">
                            <h1 className="text-3xl md:text-4xl font-extrabold font-poppins tracking-wide leading-snug">
                                Welcome to Your <span className="text-yellow-400">Ultimate</span> Store
                            </h1>
                            <p className="text-sm md:text-base text-gray-200 font-poppins">
                                Shop smart. Shop fast. Everything you need — snacks, drinks, and more — delivered with care and convenience.
                            </p>
                            <Link
                                to="/products"
                                className="w-fit bg-gradient-to-r m-auto from-yellow-300 via-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:brightness-110 transition"
                            >
                                Browse Products
                            </Link>
                        </div>

                        {/* Right Image */}
                        <div className="mt-6 lg:mt-0 md:hidden">
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
                {/* <h2 className="text-3xl font-bold text-center  mb-6">
                    Featured Products
                </h2> */}
                {/* <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 lg:text-5xl text-3xl font-extrabold uppercase tracking-wide lg:mb-10 mb-4 drop-shadow-sm">
                    Featured Products
                </h2> */}
                <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 lg:text-5xl text-3xl font-extrabold uppercase tracking-wide lg:mb-10 mb-4 drop-shadow-sm font-poppins">
                    Featured Products
                </h2>


                {category.products && category.products.length > 4 ? (
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
                    {category.products.map((product) => (
                    <SwiperSlide key={product._id} className="text-center flex flex-col  items-center py-6 pb-8">
                        <Link to={`/products/${product._id}`} className="border border-stone-300 bg-white p-4 shadow-lg rounded-lg flex flex-col justify-between h-full">
                            <img
                                src={`http://localhost:3003${product.productPhoto}`}
                                alt={product.productName}
                                className="w-full lg:h-60 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold lg:h-12 truncate ">{product.productName}</h3>
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
