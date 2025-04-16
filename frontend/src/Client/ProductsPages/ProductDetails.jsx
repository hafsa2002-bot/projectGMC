import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Heart, X } from 'lucide-react'
import SpinnerLoader from '../../SpinnerLoader'
import {useCart} from '../../CartContext'


function ProductDetails() {
    const {product_id} = useParams()
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [soldPercentage, setSoldPercentage] = useState(0)
    const {addToFavorites, favorites, setFavorites, addToCart} = useCart()
    const [favorite, setFavorite] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    const fetchData = () => {
        axios.get(`http://localhost:3003/admin/items/view/${product_id}`)
            .then(response => {
                setProduct(response.data)
                setLoading(false)
                setSoldPercentage(response.data.qty > 0 ? (response.data.qty / (response.data.qty + response.data.itemsSold)) * 100 : 0);
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    }

    const addToCartFunction = () => {
        if(product.qty > 0){
            addToCart(product)
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000)
        }else if(product.qty === 0){
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 3000)
        }
    }

    const addToFavoritesFunction = (x) => {
        if(x){
            setFavorite(true)
            addToFavorites(product)
        }else{
            setFavorite(false)
            const updatedList = favorites.filter((fav) => fav._id !== product._id)
            localStorage.setItem('favorites', JSON.stringify(updatedList))
            setFavorites(updatedList)
        }
        
    }

    useEffect(() => {
            const isFavorite = favorites?.some((fav) => fav._id === product._id)
            setFavorite(isFavorite)
        }, [favorites, product._id])

    useEffect(() => {
        fetchData()
    }, [product_id])
  return (
    <div className='lg:mt-24 mt-32 px-7 '>
        <div onClick={() => navigate(-1)} className='flex font-semibold text-xl gap-1 items-center cursor-pointer w-1/12'> <ArrowLeft/> Back</div>
        {
            loading 
            ?(
                <SpinnerLoader/>
            ):(
                <div className='flex gap-14 justify-center items-center mt-10 px-5'>
                    <div className='w-4/12 h-4/12'>
                        <img className='w-full h-full' src={`http://localhost:3003${product.productPhoto}`} alt={`${product.productName}`} />
                    </div>
                    <div className=' w-1/2 p-6 '>
                        <div className='flex flex-col gap-2'>
                            <div>
                                {/* product name */}
                                <p className=' text-2xl'> {product.productName} </p>
                                {/* price */}
                                <p className='font-bold text-3xl'> {product.price} <span className='text-base'>MAD</span> </p>
                            </div>
                            <div className="w-full my-4">
                                {/* Show message if out of stock */}
                                {product.qty === 0 ? (
                                    <p className="text-red-600 font-semibold text-xl bg-red-100 w-3/12 text-center rounded-full">Out of stock</p>
                                ) : (
                                    <div className='flex flex-col gap-2 w-full'>
                                        <div className=' text-base'> {product.qty} items left </div>
                                        <div className="bg-gray-300 rounded-full h-3 w-8/12 overflow-hidden">
                                            <div
                                                className={`h-full text-white text-sm px-2 flex items-center transition-all duration-500 
                                                    ${product.qty < product.minLevel ? 'bg-red-600' : 'bg-yellow-500'}`}
                                                style={{ width: `${soldPercentage}%` }}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {product.categoryId && (
                                <Link
                                    to={`/products/category/${product.categoryId.categoryName}`} 
                                    className='hover:font-semibold hover:underline flex items-center cursor-pointer'
                                >
                                        Category: {product.categoryId.categoryName}  
                                        <ChevronRight size={16} /> 
                                </Link>
                            )}
                            
                        </div>
                        <div className='flex gap-5 mt-18'>
                            <div
                                onClick={() => addToCartFunction()} 
                                className='bg-stone-800 text-xl cursor-pointer font-semibold text-white h-13 flex justify-center items-center w-7/12'>
                                Add To Cart
                            </div>
                            <div
                                onClick={() => addToFavoritesFunction(!favorite)} 
                                className='bg-white w-13 h-13 border border-stone-800 rounded-full flex justify-center items-center '
                            >
                                {/* 'rgb(41, 37, 36)'  */}
                                <Heart fill={(favorite) ? 'rgb(41, 37, 36)' : 'white'} strokeWidth={(favorite) ? '0' : '1'} stroke='rgb(41, 37, 36)' size={32}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        {
            showMessage && (
                <div className='px-3 py-2 fixed lg:top-20 top-32 lg:w-auto w-10/12  left-1/2 z-50 transform -translate-x-1/2 text-black text-center rounded-lg bg-red-50 flex justify-center items-center gap-3 border border-gray-300 '>
                    <div className='w-4 h-4 bg-red-700 rounded-full flex justify-center items-center'><X className='text-white' size={12}/></div>
                    <p>Product Almost sold out</p> 
                </div>
            )
        }  
        {
            successMessage && (
                <div className=' py-3 px-5 fixed lg:top-20 top-32 left-1/2 z-50 transform -translate-x-1/2 text-black text-center text-lg bg-green-50 rounded-lg lg:bg-green-50  flex justify-center items-center gap-3 border border-gray-200'>
                    <div className='w-6 h-6 bg-green-800 rounded-full flex justify-center items-center'><Check className='text-white' size={15} /></div>
                    <p>Added to cart!</p> 
                </div>
            )
        }
        
    </div>
  )
}

export default ProductDetails
