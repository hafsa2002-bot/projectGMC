import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FolderOpen } from 'lucide-react'
function AllCategories() {
    const [categories, setCategories] = useState([])
    const categoriesWithProducts = () => {
        axios.get("http://localhost:3003/admin/items/categories-with-Products")
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error: ", error))
    }
    useEffect(() => {
        categoriesWithProducts()
    }, [])
  return (
    <>
    <p>All categories</p>
    <div className='flex flex-wrap justify-center gap-10'>
       { (categories.length > 0)
       ?(
            categories.map((category, index) => (
                <div className='border-3 border-white overflow-hidden rounded-lg'>
                    {/* <p>{category.categoryName}</p> */}
                    <div>
                        <div className=''>
                            {(category.products && category.products.length > 0)
                            ?(
                            <div className='flex w-60 h-32 '>
                                <div className='w-1/2 border-r-3 border-b-3 border-white'>
                                    {
                                        (category.products.length > 0 && category.products[0].productPhoto)
                                        ? (
                                            <img src={`http://localhost:3003${category.products[0].productPhoto}`} alt="" />
                                        ):(
                                            <div className="bg-gray-500"></div>
                                        )
                                    }
                                </div>
                                <div className='flex flex-col w-1/2 '>
                                    <div className=' h-1/2 border-b-3 border-white'>
                                        {
                                            (category.products.length > 1 && category.products[1].productPhoto)
                                            ? (
                                                <img src={`http://localhost:3003${category.products[1].productPhoto}`} alt="" />
                                            ):(
                                                <div className="bg-gray-500"></div>
                                            )
                                        }
                                    </div>
                                    <div className='h-1/2 border-b-3 border-white'>
                                        {
                                            (category.products.length > 2 && category.products[2].productPhoto)
                                            ? (
                                                <img src={`http://localhost:3003${category.products[2].productPhoto}`} alt="" />
                                            ):(
                                                <div className="bg-gray-500"></div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            ):
                            (
                                <div className='w-60 h-32 bg-gray-400 text-gray-800 flex justify-center items-center'>
                                    <FolderOpen size={50} />
                                </div>
                            )}
                            
                        </div>
                    </div>
                    <div className='bg-white text-gray-700 font-semibold'>
                        <div><p>{category.categoryName}</p></div>
                    </div>
                </div>
            ))
       ):(
        <p>No category Found</p>
       )}
    </div>
    </>
  )
}

export default AllCategories
