import axios from 'axios'
import { Info, X } from 'lucide-react'
import React, {useState, useEffect} from 'react'

function AddCategory({setAddCategory}) {
  const [categoryName, setCategoryName] = useState("")
  const [submitCategory, setSubmitCategory] = useState(false)
  const [categoriesFromDB, setCategoriesFromDB] = useState([])
  const [categoryExists, setCategoryExists] = useState(false)

  const getCategories = () => {
    axios.get("http://localhost:3003/admin/items/categories")
      .then(response => {
        const categoryNames = response.data.map(
          category => category.categoryName
        )
        setCategoriesFromDB(categoryNames)
        console.log("categories names : ", categoryNames)
      })
      .catch(error => console.log("Error: ", error))
  }

  useEffect(() => {
    if (submitCategory && !categoryExists) {
      setAddCategory(false); // Close modal after successful category add
    }
  }, [submitCategory, categoryExists, setAddCategory]);

  useEffect(() => {
    getCategories()
  }, [])

  const isCategoryExist = (categName) => {
    return categoriesFromDB.includes(categName)
  }

  const handleAddCategory = async(event) => {
    event.preventDefault();

    if(isCategoryExist(categoryName)){
      console.log(`this category ${categoryName} alreday exists`)
      setCategoryExists(true)
      setSubmitCategory(true)
      return 
    }else{
      try{
        console.log("Input: ", categoryName)
        const response = await axios.post("http://localhost:3003/admin/items/addCategory", 
          {categoryName},
          {headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }}
        )
        console.log("category added: ", response.data)
        setSubmitCategory(true)
        setCategoryExists(false)
        setAddCategory(false)
      }catch(error){
        console.log("Error: ", error)
        setSubmitCategory(true)
        setCategoryExists(false)
      }
    }
  }


  // console.log("setAddCategory: ", setAddCategory)

  return (
    <div className='bg-black  w-screen h-screen fixed z-50 top-0 right-0 flex justify-center items-center' style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
        <div className='bg-white flex flex-col rounded-lg p-6 gap-4 w-4/12'>
          <div className=''>
            <div className='w-full flex justify-end'>
              <div 
                onClick={() => setAddCategory(false)}
                className='flex justify-center items-center rounded-full hover:bg-gray-200 w-8 h-8 cursor-pointer'>
                <X/>
              </div>
            </div>
            <div >
              <p className='text-2xl font-semibold'>Add New Category</p>
              <p className='text-gray-600'>This will be added to your product category</p>
            </div>
          </div>

          {/* I used a <div> instead of a <form> to avoid nesting a form inside another form */}
          <div className='flex flex-col gap-5'>
            <div  className='flex flex-col gap-2'>
              <label htmlFor="categoryName" className='text-gray-700 font-medium'>Category Name</label>
              <input
                onChange={(e) => setCategoryName(e.target.value)} 
                value={categoryName}
                type="text" 
                name="categoryName" 
                id="categoryName"
                className='bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none  border-gray-300 focus:ring-blue-500 focus:border-blue-500'

                // className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none ${((qty==="" || qty == 0) && showRequired) ? ' border-red-600 ': 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  `   }
              />
            </div>
            <div 
              onClick={handleAddCategory}
              className='cursor-pointer text-white font-semibold text-center bg-blue-600 bordertext-white rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500' >
              Add category
            </div>
            {(submitCategory && categoryExists) && (
              <div className='  text-red-700 bg-red-100 rounded-lg px-3 py-1 flex gap-2 w-full border'>
                <div className=''><Info/></div>
                <p className=''> this category already exist</p>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default AddCategory
