import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ProductItem from './ProductItem'
import axios from 'axios'
import SpinnerLoader from '../../SpinnerLoader';
import Footer from '../Footer';

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
    <div className='mt-36'>
        <h1 className='text-4xl text-center font-semibold mb-10'> {firstLetterToUpperCase(category)} </h1>
        {
            isLoading 
            ? (
                <SpinnerLoader/>
            )
            :(
                <div className=' flex flex-wrap lg:gap-9 gap-x-2 gap-y-9 justify-between lg:w-11/12 m-auto lg:px-10 px-6'>
                    {
                        listOfProducts.products?.map((product, index) => (
                            <ProductItem product = {product} key={index} />
                        ))
                    }
                </div>

            )
        }
        <Footer/>
    </div>
  )
}

export default CategoryPage
