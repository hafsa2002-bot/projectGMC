import { CirclePlus, Trash2, X } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DeleteRequestedProduct from './DeleteRequestedProduct'

function RequestedProducts() {
    const [requestedProducts, setRequestedProducts] = useState([])
    const [reqProductName, setReqProductName] = useState("")
    const [showFormToAddProduct, setShowFormToAddProduct] = useState(false)
    const [submitProduct, setSubmitProduct] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const getRequestedProducts = () => {
        axios.get("http://localhost:3003/admin/dashbord/requested-products")
            .then(response => setRequestedProducts(response.data))
            .catch(error => console.log("Error: ", error))
    }
    
    const handleRequestProduct = async() => {
        setSubmitProduct(true)
        if(!reqProductName.trim()) return;
        try{
            const response = await axios.post("http://localhost:3003/admin/dashboard/add-requested-product",
                {reqProductName},
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }}
            )
            console.log("product added successfully: ", response.data)
            getRequestedProducts() // refresh the list
            setShowFormToAddProduct(false)
            setReqProductName("")
            setSubmitProduct(false)
        }catch(error){
            console.log("Error: ", error)
        }
    }
    /*
    const deleteRequestedProduct = (productID) => {
        axios.delete(`http://localhost:3003/admin/dashboard/delete-requested-product/${productID}`,
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` 
            }}
        )
            .then((response) => console.log("requested product deleted:", response.data))
            .catch(error => console.log("error: ", error))
    }
            */

    useEffect(() => {
        getRequestedProducts()
    }, [requestedProducts])
    
  return (
    <div className=''>
        <div className='pt-2 sticky top-0 z-10 bg-gray-50 px-4 pb-2'>
            <p className='text-xl font-semibold text-gray-700'>Requested Products</p>
        </div>
        <div className='overflow-y-scroll h-64 '>
            <div className='flex justify-end'>
                <div 
                    onClick={() => setShowFormToAddProduct(true)}
                    className='  w-full text-center flex justify-center items-center gap-2 rounded-lg  py-1.5 mt-2 mx-2 font-semibold cursor-pointer bg-blue-500 text-white'>
                    <div><CirclePlus size={20} /></div>
                    <p className='text-sm'>Add Product</p>
                </div>
            </div>
            {showFormToAddProduct && (
                <div className="fixed z-50 w-screen h-screen top-0 right-0 flex justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
                    <div className='w-96 h-72 bg-white rounded-lg p-4'>
                        <div
                            onClick={() => setShowFormToAddProduct(false)}
                            className='flex justify-end text-end w-full'>
                            <div className='w-8 h-8 hover:bg-gray-200 cursor-pointer rounded-full flex justify-center items-center'><X /></div>
                        </div>
                        <div className='px-2 flex flex-col gap-5'>
                            <div className="text-2xl font-semibold text-gray-700">
                                <p>Add New Requested Product</p>
                            </div>
                            <div className='flex flex-col gap-4 '>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="ReqProductName" className='  font-medium text-gray-500'>Product Name</label>
                                    <input
                                        className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none ${(reqProductName === "" && submitProduct) ? ' border-red-600 ': 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  ` }
                                        type="text" 
                                        value={reqProductName}
                                        onChange={(event) => setReqProductName(event.target.value)}
                                        name="ReqProductName" 
                                        id="ReqProductName"
                                        placeholder='Enter The Product Name' />
                                    {
                                        (submitProduct && (reqProductName === "")) && (
                                            <p className='text-red-500'>Required</p>
                                        )
                                    }
                                </div>
                                <div
                                    onClick={handleRequestProduct}
                                    className='cursor-pointer w-full bg-blue-500  text-white rounded-lg p-2.5 text-center font-semibold'
                                >
                                    Add Product
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='flex h-full flex-col gap-2 mt-2 px-2'>
                {(requestedProducts.length > 0 )
                ?(
                    requestedProducts.map((product, index) => (
                        <div key={product._id} 
                            className='relative p-2 border rounded-lg border-gray-400 flex justify-between gap-4 items-start '
                        >
                            <div className='font-semibold text-gray-700 max-w-10/12 '>
                                <p className=' break-words'>{product.reqProductName}</p>
                            </div>
                            <div
                                // onClick={() => deleteRequestedProduct(product._id)}
                                onClick={() => setShowDelete(true)}
                                className='text-red-400 cursor-pointer pt-2'
                            >
                                <Trash2 size={19} />
                            </div>
                            {showDelete && <DeleteRequestedProduct setShowDelete={setShowDelete} name={product.reqProductName} id={product._id}  />}
                        </div>
                    ))
                ):(
                    <div className='h-7/12 px-5 text-center w-full flex justify-center items-center font-semibold text-xl text-gray-400'><p>No Products Found</p></div>
                )}
            </div>
        </div>
    </div>
  )
}

export default RequestedProducts
