import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Heart, Home, ShoppingBag, ShoppingCart, X } from 'lucide-react'
import SpinnerLoader from '../../SpinnerLoader'
import {useCart} from '../../CartContext'
import Sante from './Sante'
import Footer from '../Footer'


function ProductDetails() {
    const {product_id} = useParams()
    const [product, setProduct] = useState({})
    const [productInfo, setProductInfo] = useState({})
    const [productQty, setProductQty] = useState("")
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

    const productDetailsFromAPI = () => {
        if (!product.barcode) {
            console.log("No barcode available for this product");
            return;
        }
    
        axios.get(`https://world.openfoodfacts.org/api/v3/product/${product.barcode}`)
            .then(response => {
                
                    console.log(response.data)
                    setProductQty(response.data.product.quantity)
                    setProductInfo(response.data); // Save only the product part
                    console.log("nutriscore_grade: ", response.data?.nutriscore_grade)
                // } else {
                //     console.log("Product not found in Open Food Facts API");
                // }
            })
            .catch(error => console.log("Failed to get data from Open Food API:", error));
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

    useEffect(() => {
        if (product?.barcode) {
            productDetailsFromAPI();
        }
    }, [product.barcode])
  return (
    <>
        <div className="lg:mt-24 font-roboto mt-32 lg:px-8 px-4">
            <div
                // onClick={() => navigate(-1)}
                className="flex text-gray-500 font-semibold gap-1 items-center cursor-pointer py-3 "
                >
                    {/* <ArrowLeft />
                    <p className="underline hover:text-yellow-500">Retour</p> */}
                    <Link to="/" className='hover:text-yellow-400  hover:underline transition-all duration-300 flex items-center gap-1'><Home size={21} className='mb-[3px]' /> Home </Link>
                    <ChevronRight/> <Link to="/products" className='hover:text-yellow-400  hover:underline transition-all duration-300'>Products </Link>
                    {
                        product?.categoryId && 
                        <>
                            <ChevronRight/> 
                            <Link to={`/products/category/${product?.categoryId?.categoryName}`} className='hover:text-yellow-400  hover:underline transition-all duration-300'>{product?.categoryId?.categoryName} </Link>
                        </>}
                    <ChevronRight/><div className='hover:text-yellow-400 hover:underline transition-all duration-300'>{product?.productName}</div>
                    
            </div>
            {loading ? (
                <SpinnerLoader />
                ) : (
                    <>
                        <div className="lg:flex gap-16 justify-center items-center mt-6 px-6">
                        {/* Image Section */}
                        <div className="lg:w-4/12 w-full">
                            <img className="w-full h-[75vh] rounded-lg" src={`http://localhost:3003${product.productPhoto}`} alt={product.productName} />
                        </div>

                        {/* Product Info Section */}
                        <div className="lg:w-5/12 w-full flex flex-col space-y-6">
                            {/* Product Name */}
                            <h1 className="text-4xl font-bold text-gray-900">{product.productName}</h1>

                            {/* Price */}
                            <p className="text-3xl font-semibold text-gray-800">{product.price} <span className="text-xl text-gray-600">MAD</span></p>
                            {/* <p className="text-3xl font-semibold text-yellow-500">{product.price} <span className="text-2xl text-yellow-500">MAD</span></p> */}

                            {/* Stock Status */}
                            <div className="w-full space-y-6">
                                {product.qty === 0 ? (
                                    <div className="bg-red-100 w-1/2 text-red-700 font-semibold text-center py-1 rounded-full shadow-md">Out of stock</div>
                                ) : (
                                    <div>
                                        <p className="text-lg text-gray-700">{product.qty} Items left</p>
                                        <div className="bg-gray-200 rounded-full h-3 w-10/12 overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-500 ${product.qty < product.minLevel ? 'bg-red-600' : 'bg-yellow-500'}`}
                                                style={{ width: `${soldPercentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            {product.barcode && productInfo.product && (
                                <div className="text-lg text-gray-700 space-y-2">
                                    <p><span className="font-semibold">Produit:</span> {productInfo.product.product_name}</p>
                                    <p><span className="font-semibold">Quantité:</span> {productInfo.product.quantity}</p>
                                    <p><span className="font-semibold">Marque:</span> {productInfo.product.brands}</p>
                                </div>
                            )}

                            {/* Category */}
                            {product.categoryId && (
                                <Link
                                    to={`/products/category/${product.categoryId.categoryName}`}
                                    className="text-lg underline hover:font-semibold flex items-center gap-1"
                                >
                                    Category: {product.categoryId.categoryName}
                                    <ChevronRight size={16} />
                                </Link>
                            )}

                            {/* Add to Cart and Favorite */}
                            <div className="flex gap-8 mt-6">
                            <div
                                onClick={() => addToCartFunction()}
                                className="bg-black text-white text-xl font-semibold py-2 w-8/12 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer flex justify-center items-center gap-2"
                            >
                                Add to Cart <ShoppingCart/>
                            </div>
                            <div
                                onClick={() => addToFavoritesFunction(!favorite)}
                                className="bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-all cursor-pointer flex justify-center items-center"
                            >
                                <Heart fill={favorite ? 'rgb(41, 37, 36)' : 'white'} strokeWidth={favorite ? '0' : '1'} stroke="rgb(41, 37, 36)" size={32} />
                            </div>
                            </div>
                        </div>
                        </div>
                        <div>
                            <Sante product={productInfo.product} />
                        </div>
                    </>
                )}

                {/* Out of Stock Warning */}
                {showMessage && (
                    <div className="px-4 py-3 fixed lg:top-20 top-32 lg:w-auto w-11/12 left-1/2 z-50 transform -translate-x-1/2 text-black text-center rounded-lg bg-red-50 flex justify-center items-center gap-4 border border-gray-300">
                    <div className="w-5 h-5 bg-red-700 rounded-full flex justify-center items-center">
                        <X className="text-white" size={14} />
                    </div>
                    <p>Product Almost sold out</p>
                    </div>
                )}

                {/* Success Message */}
                {successMessage && (
                    <div className="py-3 px-6 fixed lg:top-20 top-32 left-1/2 z-50 transform -translate-x-1/2 text-black text-center text-lg bg-green-50 rounded-lg lg:bg-green-50 flex justify-center items-center gap-4 border border-gray-200">
                    <div className="w-6 h-6 bg-green-800 rounded-full flex justify-center items-center">
                        <Check className="text-white" size={16} />
                    </div>
                    <p>Added to cart!</p>
                    </div>
                )}
        </div>
        {/* bottom section */}
        {/* <div className="h-72 relative overflow-hidden">
            <img
                src="/images/Banner3.png"
                alt=""
                className="absolute inset-0 w-full h-full lg:object-cover object-contain z-0"
            />
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <p className="absolute left-10 top-1/2 transform -translate-y-1/2 z-10 text-gray-100 text-3xl font-semibold px-5 py-3 max-w-md">
                Des offres exclusives et des réductions spéciales, rien que pour vous sur mobile !    
            </p>
        </div> */}
        <Footer/>
    </>

  )
}

export default ProductDetails
