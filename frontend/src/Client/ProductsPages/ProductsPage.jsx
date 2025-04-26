import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductItem from './ProductItem'
import SpinnerLoader from '../../SpinnerLoader'
import Footer from '../Footer'
import { ArrowRight, ChevronDown } from 'lucide-react'
import CategoriesSection from './CategoriesSection'

function ProductsPage() {
    const [categories, setCategories] = useState({})
    const [products, setProducts] = useState([])
    const [displayedProducts, setDisplayedProducts] = useState([])
    const [itemsToShow, setItemsToShow] = useState(48)
    const [loadingProducts , setLoadingProducts ] = useState(true)
    const [loadingCategories , setLoadingCategories ] = useState(true)
    const scrollRef = useRef();

    
    
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
                setLoadingProducts(false)
            })
            .catch(error => {
                console.log("Error: ",error)
                setLoadingProducts (false)
            })
    }
    useEffect(() => {
        console.log("call effect...")
        let mounted = true;
        if (mounted) {
            fetchData();
        }
        return () => { mounted = false };
    }, []);
    

    const loadMoreProducts = () => {
            const newItemsToShow = itemsToShow + 48;
            setItemsToShow(newItemsToShow)
            setDisplayedProducts(products.slice(0, newItemsToShow))
        }
    
    
  return (
    <div className='mt-20'>
        <div className=' w-full'>
            <CategoriesSection setLoadingCategories={setLoadingCategories} />

            {
                loadingProducts || loadingCategories
                ? (
                    <SpinnerLoader/>
                )
                : (
                    <>
                        <div className='w-full border'>
                            <p>All {products.length} </p>
                            <p></p>
                        </div>
                        {/* items-baseline */}
                        <div className='grid lg:grid-cols-5 grid-cols-2  lg:gap-9 gap-x-2 gap-y-9 mt-16  lg:px-10 px-6 '>
                            {
                                displayedProducts.map((product, index) => (
                                    <ProductItem product = {product} key={index}  />
                                ))
                            }
                        </div>
                        {
                            displayedProducts.length < products.length ? (
                                <div className='flex justify-center mt-12'>
                                    <button 
                                        onClick={loadMoreProducts} 
                                        className="px-9 py-2 text-lg btn relative lg:w-72 inline-flex items-center justify-start overflow-hidden font-semibold transition-all bg-white text-black border-2 border-black rounded-full shadow-md hover:shadow-lg group"
                                    >
                                        <span className="w-72 h-48 rounded bg-black absolute bottom-0 left-0 translate-x-full translate-y-full mb-9 ml-9 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                        <span className="relative flex justify-center items-end w-full text-center transition-colors duration-300 ease-in-out group-hover:text-white">
                                            <span>View More</span>
                                            <ChevronDown size={30} className="pt-2" />
                                        </span>
                                    </button>
                                </div>
                            ):(
                                <div className='w-full h-[80vh] flex justify-center items-center'>
                                    <img className='w-[440px] h-[370px]' src='/images/noProducts.png' />
                                </div>
                            )
                        }
                    </>
                )
        }
        </div>
        <div className='mt-20'>
            <Footer/>
        </div>
    </div>
  )
}

export default ProductsPage
