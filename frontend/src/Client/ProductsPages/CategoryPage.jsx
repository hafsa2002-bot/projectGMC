import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductItem from './ProductItem'
import axios from 'axios'
import SpinnerLoader from '../../SpinnerLoader';
import Footer from '../Footer';
import { ChevronRight, Home } from 'lucide-react';
import ListOfProducts from './ListOfProducts';
import FilterProducts from './FilterProducts';

function CategoryPage() {
    const {category} = useParams();
    const [listOfProducts, setListOfProducts] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState("default")
    const apiUrl = import.meta.env.VITE_API_URL;
    

    useEffect(() => {
        setListOfProducts([]);
        setIsLoading(true)
        axios.get(`${apiUrl}/category/${category}`)
            .then(response => {
                setListOfProducts(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log("Error while fetching data of each category : ", error)
                setIsLoading(false)
            })
    }, [category])
    
    const firstLetterToUpperCase = (str) => {
        const result =   str[0].toUpperCase() + str.slice(1,str.length)
        return result;
    }

    const sortedProducts = Array.isArray(listOfProducts.products) ? [...listOfProducts.products] : [];

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
    <div className='lg:mt-26 mt-32 '>
        <div className=' lg:px-10 px-4'>
            {/* <div className='flex  pt-5 text-sm items-center text-gray-500'>
                <Link  className='hover:text-yellow-400 hover:underline hover:font-semibold transition-all duration-300 flex items-center gap-1' to="/"><Home size={16} /> Home</Link> 
                <ChevronRight size={20} />
                <Link  className='hover:text-yellow-400 hover:underline hover:font-semibold transition-all duration-300' to="/products">Products</Link>
                <ChevronRight size={20}/>
                <Link className='hover:text-yellow-400 hover:underline hover:font-semibold transition-all duration-300' to={`/products/category/${category}`}>{firstLetterToUpperCase(category)}</Link>
            </div> */}
            <div className='flex items-center pt-4 text-sm text-gray-600'>
                <nav aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <Link 
                                to="/" 
                                className='flex items-center gap-1 transition-colors duration-200 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded'
                            >
                                <Home size={16} className="flex-shrink-0" />
                                <span className="hover:underline">Accueil</span>
                            </Link>
                        </li>
                        
                        <li>
                            <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                        </li>
                        
                        <li>
                            <Link 
                                to="/products" 
                                className='transition-colors duration-200 hover:text-yellow-500 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded'
                            >
                                Produits
                            </Link>
                        </li>
                        
                        <li>
                            <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
                        </li>
                        
                        <li aria-current="page">
                            <Link 
                                to={`/products/category/${category}`}
                                className='font-medium text-yellow-600 transition-colors duration-200 hover:text-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded'
                            >
                                {firstLetterToUpperCase(category)}
                            </Link>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className='w-full flex mt-3 justify-between'>
                <div className=' pb-12  w-full lg:flex justify-between items-center'>
                    <div className='flex text-gray-700'>
                        <h1 className='lg:text-4xl text-3xl font-poppins font-semibold  mt-4'> {firstLetterToUpperCase(category)} </h1>
                        <div className='relative text-sm top-3 left-1.5'> ({listOfProducts?.products?.length}) </div>
                    </div>
                    <div className='lg:mt-0 mt-4 text-end'>
                        <FilterProducts setSelectedOption={setSelectedOption}/>
                    </div>
                </div>
            </div>
        </div>
        {
            isLoading 
            ? (
                <SpinnerLoader/>
            )
            :(
                <>
                    <ListOfProducts
                            products={selectedOption === "default" 
                                ? listOfProducts.products 
                                : sortedProducts}
                        />
                </>
            )
        }
        <div className='mt-20'>
            <Footer/>
        </div>
    </div>
  )
}

export default CategoryPage
