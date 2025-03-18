import React, {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Nav from './Nav';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import Footer from './Footer';


function HomePage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

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
    

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <>
        <Nav details={false} />
        <main className="lg:mt-28 mt-20">
            {/* Hero Section */}
            {/* laptop version  */}
            <section className="lg:flex hidden h-[80vh] rounded-xl m-auto w-10/12  p-9">
                <div className="w-1/2 flex flex-col gap-2 justify-center">
                    <h1 className="text-5xl font-extrabold uppercase tracking-wide">
                        Shop Smart.<br /> Shop Stylish.
                    </h1>
                    <p className="text-lg w-9/12 mt-4">
                        Discover a world of fashion, electronics, home essentials, and
                        more – all in one place.<br /> Shop quality, shop convenience.
                    </p>
                    {/* bg-[#B88C4A] */}
                    <Link
                        to={"/products"}
                        className="text-center bg-gradient-to-r w-52 from-yellow-300 via-yellow-500  to-yellow-600  px-4 py-2 rounded-full text-lg font-semibold mt-5"
                    >
                        Start Shopping
                    </Link>
                </div>
                <div className="ml-32 rounded-xl overflow-hidden w-[420px] h-[420px]">
                    <img className="w-full h-full" src="/photoAI1.jpg" alt="Hero" />
                </div>
            </section>
            {/* phone version  */}
            <section className="relative display lg:hidden m-auto w-full h-[487px]  bg-contain bg-[url('/photoAI1.jpg')]">
                <div className='absolute bg-black h-[487px] opacity-40 w-full h-'></div>
                <div className=" absolute h-full  flex text-white pt-16 flex-col gap-2 justify-center items-center">
                    <h1 className="text-5xl font-extrabold text-center uppercase tracking-wide">
                        Shop Smart.<br /> Shop Stylish.
                    </h1>
                    <p className="text-xl w-10/12 mt-4 text-center">
                        Discover a world of fashion, electronics, home essentials, and
                        more – all in one place.<br /> Shop quality, shop convenience.
                    </p>
                    {/* bg-[#B88C4A] */}
                    <Link
                        to={"/products"}
                        className="text-center  bg-gradient-to-r w-52 from-yellow-300 via-yellow-500  to-yellow-600  px-4 py-3 rounded-full text-xl font-semibold mt-5"
                    >
                        Start Shopping
                    </Link>
                </div>
                {/* <div className="ml-32 rounded-xl overflow-hidden w-[420px] h-[420px]">
                    <img className="w-full h-full" src="/photoAI1.jpg" alt="Hero" />
                </div> */}
            </section>

            {/* Product Carousel Section */}
            {/* <section className="w-10/12 m-auto my-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-center  mb-6">
                    Featured Products
                </h2>

                {products.length > 4 ? (
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
                    {products.map((product) => (
                    <SwiperSlide key={product.id} className="text-center flex flex-col items-center py-6 pb-8">
                        <div className="border border-stone-300 bg-white p-4 shadow-lg rounded-lg flex flex-col justify-between h-full">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-60 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold h-12">{product.title}</h3>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
                ) : (
                    <p className="text-center text-3xl font-semibold text-gray-500">Loading ...</p>
                )}
                <button onClick={() => navigate('/products')} className="bg-black text-white text-lg px-6 py-2 rounded-lg mb-6 mt-3 w-52 m-auto   transition">
                    View All Products
                </button>
            </section> */}
            <section className="w-10/12 m-auto my-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-center  mb-6">
                    Featured Products
                </h2>

                {products.length > 4 ? (
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
                    {products.map((product) => (
                    <SwiperSlide key={product.id} className="text-center flex flex-col items-center py-6 pb-8">
                        <div className="border border-stone-300 bg-white p-4 shadow-lg rounded-lg flex flex-col justify-between h-full">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-60 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold h-12">{product.title}</h3>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
                ) : (
                    <p className="text-center text-3xl font-semibold text-gray-500">Loading ...</p>
                )}
                <button onClick={() => navigate('/products')} className="bg-black text-white text-lg px-6 py-2 rounded-lg mb-6 mt-3 w-52 m-auto   transition">
                    View All Products
                </button>
            </section>
            
            <section>
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
        </main>
        <Footer/>
    </>
  )
}

export default HomePage
