import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ProductItem from './ProductItem'
import SpinnerLoader from '../SpinnerLoader'
import Footer from './Footer'

function ProductsPage() {
    // const [categories, setCategories] = useState([])
    const [productsByCategory, setProductsByCategory] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    /*
    const fetchData = async () => {
        try {
            setLoading(true)
            // fetch categories
            const categoriesResponse = await axios.get("https://dummyjson.com/products/categories")
            const categorieList = categoriesResponse.data
            setCategories(categorieList)
            console.log("Categories:", categoriesResponse.data)

            // fetch products for each category
            const productsData = {}
            for(const category of categorieList){
                try{
                    const response = await axios.get(`https://dummyjson.com/products/category/${category.slug}?select=title,price,images,category,description`)
                    productsData[category.slug] = response.data.products
                    console.log(`Products for ${category.slug}:`, response.data.products)
                }catch(error) {
                    console.log(`Error fetch products for ${category.slug}: `, error)
                }
            }
            setProductsByCategory(productsData)
            
        // console.log("productsByCategory: ", productsByCategory)
        }catch(error){
            console.log("Error fetching categories: ", error)
        }finally{
            setLoading(false)
        }
    }
    */
    const fetchData = () => {
            axios.get("http://localhost:3003/admin/items/categories-with-Products")
                .then(response => {
                    setProductsByCategory(response.data)
                    console.log("data: ", response.data)
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
  return (
    <div className='mt-32'>
        <div className=' w-full'>
            {
                loading
                ? (
                    <SpinnerLoader/>
                )
                : (
                    productsByCategory?.map((category, index) => (
                        <div key={index} className='mt-32 m-auto' >
                            <h1 className=' text-5xl font-semibold text-center py-7 mb-5'> {category.categoryName} </h1>
                            <div className=' flex flex-wrap gap-2 justify-between items-baseline lg:px-10 px-6 '>
                                {category.products?.slice(0,4).map((product, index) => (
                                <ProductItem product = {product} key={index} />
                                ))}
                            </div>
                            <div className=' flex justify-center '>
                                <button onClick={() => navigate(`/products/${category.categoryName}`)}  className="px-9 py-2 text-xl mt-8   btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-indigo-50 rounded hover:bg-black group" >
                                    <span className="w-56 h-48 rounded bg-black absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                    <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Show More</span>
                                </button>
                            </div>
                        </div>
                    ))
                )
                
        }
        </div>
        <Footer/>
    </div>
  )
}

export default ProductsPage
