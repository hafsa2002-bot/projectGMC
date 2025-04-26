import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ProductItem from './ProductItem'
import axios from 'axios'
import SpinnerLoader from '../../SpinnerLoader';
import Footer from '../Footer';
import { ChevronRight } from 'lucide-react';

function CategoryPage() {
    const {category} = useParams();
    const [listOfProducts, setListOfProducts] = useState({})
    const [isLoading, setIsLoading] = useState(true);

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
    

  return (
    <div className='lg:mt-26 mt-32 '>
        <div className=' px-10'>
            <div className='flex text-sm items-center text-gray-500'>
                Home 
                <ChevronRight size={20} />
                Categories
                <ChevronRight size={20}/>
                {firstLetterToUpperCase(category)}
            </div>
            <div className='flex text-yellow-400'>
                <h1 className='text-4xl font-poppins font-semibold mb-10 mt-4'> {firstLetterToUpperCase(category)} </h1>
                <div className='relative top-3 left-1.5'> ({listOfProducts?.products?.length}) </div>
            </div>
        </div>
        {
            isLoading 
            ? (
                <SpinnerLoader/>
            )
            :(
                <div className=' grid lg:grid-cols-5 grid-cols-2 lg:gap-9 gap-x-2 gap-y-9 lg:px-10 px-6'>
                    {
                        listOfProducts.products?.map((product, index) => (
                            <ProductItem product = {product} key={index} />
                        ))
                    }
                </div>

            )
        }
        <div className='mt-20'>
            <Footer/>
        </div>
    </div>
  )
}

export default CategoryPage
