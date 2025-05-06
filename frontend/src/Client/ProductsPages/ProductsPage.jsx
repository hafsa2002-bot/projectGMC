import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductItem from './ProductItem'
import SpinnerLoader from '../../SpinnerLoader'
import Footer from '../Footer'
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'
import CategoriesSection from './CategoriesSection'
import ListOfProducts from './ListOfProducts'
import FilterProducts from './FilterProducts'

function ProductsPage() {
    const [categories, setCategories] = useState({})
    const [products, setProducts] = useState([])
    const [displayedProducts, setDisplayedProducts] = useState([])
    const [itemsToShow, setItemsToShow] = useState(30)
    const [loadingProducts , setLoadingProducts ] = useState(true)
    const [loadingCategories , setLoadingCategories ] = useState(true)
    const [selectedOption, setSelectedOption] = useState("default")
    const apiUrl = import.meta.env.VITE_API_URL;

    
    
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

        axios.get(`${apiUrl}/admin/items/list`)
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
        const newItemsToShow = itemsToShow + 15;
        setItemsToShow(newItemsToShow)
        setDisplayedProducts(products.slice(0, newItemsToShow))
    }

    const sortedProducts = [...products]; // Make a copy so you don't mutate the original

    if (selectedOption === "prix_crss") {
        sortedProducts.sort((a, b) => a.price - b.price); 
    } 
    else if (selectedOption === "prix_decrss") {
        sortedProducts.sort((a, b) => b.price - a.price); 
    }
    else if (selectedOption === "popular") {
        sortedProducts.sort((a, b) => b.itemsSold - a.itemsSold);
    }
    else if (selectedOption === "recent") {
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
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
                        <div className='w-full mt-12 flex justify-between'>
                            <div className=' pb-12  w-full lg:flex justify-between items-center lg:px-10 px-4'>
                                <div className='flex text-gray-700'>
                                    <h1 className='lg:text-4xl text-3xl font-poppins font-semibold  mt-4 '> Tous les produits </h1>
                                    <div className='relative text-sm top-3 left-1.5'> ({products?.length}) </div>
                                </div>
                                <div className='lg:mt-0 mt-4 text-end'>
                                    <FilterProducts setSelectedOption={setSelectedOption}/>
                                </div>
                            </div>
                        </div>
                        {/* items-baseline */}
                        {
                            (
                                selectedOption == "default" ? <ListOfProducts products={displayedProducts} />
                                : selectedOption == "popular" ? <ListOfProducts products={sortedProducts} />
                                : selectedOption == "recent" ? <ListOfProducts products={sortedProducts} />
                                : selectedOption == "prix_crss" ? <ListOfProducts products={sortedProducts} />
                                : selectedOption == "prix_decrss" ? <ListOfProducts products={sortedProducts} />
                                : null
                            )
                        }
                            
                        {
                            products.length > 0 ? (
                                displayedProducts.length < products.length && (
                                    <div className='flex justify-center mt-12'>
                                    <button 
                                        onClick={loadMoreProducts} 
                                        className="px-9 py-3 text-lg btn relative lg:w-72 inline-flex items-center justify-start overflow-hidden font-semibold transition-all bg-yellow-300 text-gray-900   rounded-full shadow-md hover:shadow-lg group"
                                    >
                                        <span className="w-72 h-48 rounded bg-gray-900 absolute bottom-0 left-0 translate-x-full translate-y-full mb-9 ml-9 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                        <span className="relative flex justify-center items-center w-full  text-center transition-colors duration-300 ease-in-out group-hover:text-white gap-2">
                                            <span className='font-bold'>View More</span>
                                            <ChevronDown size={24} className="transition-transform duration-300 group-hover:translate-y-1" />
                                        </span>
                                    </button>
                                </div>
                                )
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
