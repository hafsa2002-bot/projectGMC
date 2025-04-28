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
    

    useEffect(() => {
        setListOfProducts([]);
        setIsLoading(true)
        axios.get(`http://localhost:3003/category/${category}`)
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
        <div className=' px-10'>
            <div className='flex  pt-5 text-sm items-center text-gray-500'>
                <Link  className='hover:text-yellow-400 hover:underline hover:font-semibold transition-all duration-300 flex items-center gap-1' to="/"><Home size={16} /> Home</Link> 
                <ChevronRight size={20} />
                <Link  className='hover:text-yellow-400 hover:underline hover:font-semibold transition-all duration-300' to="/products">Products</Link>
                <ChevronRight size={20}/>
                <Link className='hover:text-yellow-400 hover:underline hover:font-semibold transition-all duration-300' to={`/products/category/${category}`}>{firstLetterToUpperCase(category)}</Link>
            </div>
            <div className='w-full flex mt-3 justify-between'>
                <div className=' pb-12  w-full flex justify-between items-center'>
                    <div className='flex text-gray-700'>
                        <h1 className='text-4xl font-poppins font-semibold  mt-4'> {firstLetterToUpperCase(category)} </h1>
                        <div className='relative text-sm top-3 left-1.5'> ({listOfProducts?.products?.length}) </div>
                    </div>
                    <div>
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
