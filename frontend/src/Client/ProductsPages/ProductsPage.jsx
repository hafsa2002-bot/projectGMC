import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductItem from './ProductItem'
import SpinnerLoader from '../../SpinnerLoader'
import Footer from '../Footer'
import { ArrowRight, ChevronDown } from 'lucide-react'

function ProductsPage() {
    const [categories, setCategories] = useState({})
    const [products, setProducts] = useState([])
    const [displayedProducts, setDisplayedProducts] = useState([])
    const [itemsToShow, setItemsToShow] = useState(12)
    const [loading, setLoading] = useState(true)
    const scrollRef = useRef();

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    };
    
    const shuffleArray = (arr) => {
        // Make a copy of the array to avoid direct mutation of state
        const newArr = [...arr];
        for (let i = newArr.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]]; // Swap elements
        }
        return newArr;
    };

    const A = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // console.log("shuffleArray : ", shuffleArray(A))

    const fetchData = () => {
        console.log("Fetching items...")

        axios.get("http://localhost:3003/admin/items/list")
            .then(response => {
                console.log(response.data);
                const shuffleProducts = shuffleArray(response.data)
                // const shuffleProducts = response.data
                setProducts(shuffleProducts)
                setDisplayedProducts(shuffleProducts.slice(0, itemsToShow))
                setLoading(false)
            })
            .catch(error => {
                console.log("Error: ",error)
                setLoading(false)
            })
    }
    const getCategories = () => {
        axios.get("http://localhost:3003/admin/items/categories-with-Products")
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error: ", error))
    }
    useEffect(() => {
        console.log("call effect...")
        let mounted = true;
        if (mounted) {
            fetchData();
            getCategories();
        }
        return () => { mounted = false };
    }, []);
    

    const loadMoreProducts = () => {
            const newItemsToShow = itemsToShow + 8;
            setItemsToShow(newItemsToShow)
            setDisplayedProducts(products.slice(0, newItemsToShow))
        }
    
    const firstLetterToUpperCase = (str) => {
        const result =   str[0].toUpperCase() + str.slice(1,str.length)
        return result;
    }
  return (
    <div className='mt-28'>
        <div className=' w-full'>
            {
                loading
                ? (
                    <SpinnerLoader/>
                )
                : (
                    <>
                        {/* categories */}
                        <div className="relative w-full">
                            <div 
                                ref={scrollRef}
                                className="flex pt-3 px-8 gap-16 overflow-x-scroll w-full hide-scrollbar scroll-smooth"
                            >
                                {categories.length > 0 
                                    ? categories.map((category, index) => (
                                    <Link 
                                        to={`/products/category/${category.categoryName}`}  
                                        key={index} 
                                        className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
                                    >
                                        <div className="w-24 h-24 p-3 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
                                            {(category.products.length > 0 && category.products[0]?.productPhoto) && (
                                                <img 
                                                    src={`http://localhost:3003${category.products[0]?.productPhoto}`}
                                                    className="w-full h-full object-cover"
                                                    alt={category.categoryName}
                                                />
                                            )}
                                        </div>
                                        <p className="font-semibold text-lg mt-3 capitalize text-gray-700 break-words max-h-16 max-w-40 truncate">
                                            {firstLetterToUpperCase(category.categoryName)}
                                        </p>
                                    </Link>
                                )):(
                                    <div className='w-full h-[80vh] flex justify-center items-center'>
                                        <img className='w-[440px] h-[370px]' src='/images/noProducts.png' />
                                    </div>
                                )}
                            </div>

                        {/* Right-side Gradient Shadow (behind the button) */}
                        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                            {/* Scroll Arrow Button */}
                            <button 
                                onClick={scrollRight}
                                className="absolute right-2 top-2/5 -translate-y-1/2 bg-gray-100 border border-gray-400 rounded-full p-2 shadow-md hover:bg-gray-200 transition-all z-20"
                            >
                                <ArrowRight className="text-gray-600" />
                            </button>
                        </div>


                        {/* items-baseline */}
                        <div className=' flex flex-wrap lg:gap-9 gap-x-2 gap-y-9 justify-between mt-16  lg:px-10 px-6 '>
                            {
                                displayedProducts.map((product, index) => (
                                    <ProductItem product = {product} key={index}  />
                                ))
                            }
                        </div>
                        {
                            displayedProducts.length < products.length && (
                                <div className='flex justify-center mt-12'>
                                    <button 
                                        onClick={loadMoreProducts} 
                                        className="px-9 py-2 text-lg btn relative  lg:w-72  inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-gradient-to-r from-gray-100 via gray-300 to-gray-500 cursor-pointer rounded-full hover:bg-black group"
                                    >
                                        <span className="w-72 h-48 rounded bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                        <span className="relative flex justify-center items-end  w-full   text-center text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                                            <span >View More</span>
                                            <ChevronDown  size={30} className='pt-2' />
                                        </span>
                                    </button>
                                </div>
                            )
                        }
                    </>
                )
                
        }
        </div>
        <Footer/>
    </div>
  )
}

export default ProductsPage
