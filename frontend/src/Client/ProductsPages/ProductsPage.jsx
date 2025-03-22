import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useOutletContext } from 'react-router-dom'
import ProductItem from './ProductItem'
import SpinnerLoader from '../../SpinnerLoader'
import Footer from '../Footer'
import { ChevronDown } from 'lucide-react'

function ProductsPage() {
    const [productsByCategory, setProductsByCategory] = useState({})
    const [products, setProducts] = useState([])
    const [displayedProducts, setDisplayedProducts] = useState([])
    const [itemsToShow, setItemsToShow] = useState(12)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
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
    console.log("shuffleArray : ", shuffleArray(A))

    const fetchData = () => {
        axios.get("http://localhost:3003/admin/items/list")
            .then(response => {
                console.log(response.data);
                const shuffleProducts = shuffleArray(response.data)
                setProducts(shuffleProducts)
                setDisplayedProducts(shuffleProducts.slice(0, itemsToShow))
                setLoading(false)
            })
            .catch(error => {
                console.log("Error: ",error)
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchData()
        console.log("productsByCategory: ", productsByCategory)
    }, [])

    const loadMoreProducts = () => {
        setItemsToShow(prevItems => {
            const newItemsToShow = prevItems + 8;
            setDisplayedProducts(products.slice(0, newItemsToShow))
            return newItemsToShow;
        })
    }
  return (
    <div className='mt-40'>
        <div className=' w-full'>
            {
                loading
                ? (
                    <SpinnerLoader/>
                )
                : (
                    <>
                        <div className=' flex flex-wrap gap-9 justify-between items-baseline lg:px-10 px-6 '>
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
                                        className="px-9 py-2 text-lg btn relative  w-72  inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-gradient-to-r from-gray-100 via gray-300 to-gray-500 cursor-pointer rounded-full hover:bg-black group"
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
