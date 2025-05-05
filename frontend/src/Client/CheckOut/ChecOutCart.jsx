import { ImageOff } from 'lucide-react'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

function ChecOutCart({cart, totalAmount, totalQty}) {
    const [shipping, setShipping] = useState(40)
    const [outOfStockProducts, setOutOfStockProducts] = useState([])
    const [productById, setProductById] = useState({})
    const chechIfOutOfStock = (productId) => {
        axios.get(`http://localhost:3003/admin/items/view/${productId}`)
            .then(response => {
                setProductById(response.data)
                if(response.data.qty - response.data.expiredQty === 0){
                    setOutOfStockProducts(prevState => [...prevState, productId])
                }
            })
            .catch(error => console.log("error: ", error))
    }
    useEffect(() => {
        cart.forEach(item => chechIfOutOfStock(item._id))
    }, [])
  return (
    <>
        {/* laptop version */}
        <div className='hidden lg:block lg:w-5/12 w-full bg-gray-50 sticky top-0 right-0 h-screen pt-20 '>
            <div className='w-10/12 m-auto  border-b border-gray-300 max-h-72 flex flex-col gap-3 p-3 overflow-y-scroll'>
                {
                    cart.map((product, index) => (
                        <div key={index} className='flex items-center justify-between'>
                            <div className='flex items-center w-9/12 gap-2'>
                                <div className='relative w-16 h-16 p-1.5 bg-white border border-gray-300 rounded-lg'>
                                    {
                                        product.productPhoto 
                                        ?(
                                            <img className='w-full h-full ' src={`http://localhost:3003${product.productPhoto}`} alt="" />
                                        ):(
                                            <div className='w-full h-full  text-gray-700 flex justify-center items-center'><ImageOff /></div>
                                        )
                                    }
                                    <div className='absolute z-20 -top-1 -right-1 w-5 h-5 bg-gray-700 flex justify-center items-center rounded-full text-white'>{product.quantity}</div>
                                </div>
                                <div>
                                    <p>{product.productName}</p>
                                    {outOfStockProducts.includes(product._id) && (<p className='text-white bg-gradient-to-r from-red-700  to-red-800 rounded-full text-sm w-24 text-center mt-1'>Rupture de stock !</p>)}                            </div>
                            </div>
                            <div className=' font-mono w-3/12 text-end '>
                                <span className='text-end'>{product.price}</span> MAD
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='w-10/12 m-auto mt-9 '>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-1'>
                        <p>Sous-total</p>
                        <span className='border rounded-full p-[0.5px] bg-black'></span>
                        <p>{totalQty == 1 ? <span> {totalQty} Article</span> : <span> {totalQty} Articles</span>} </p> 
                    </div>
                    <div className=''>{totalAmount.toFixed(2)} MAD</div> 
                </div>
                <div className='flex justify-between mt-2'>
                    <div>Livarison</div>
                    <div>{shipping == 0 ? (<p>GRATUITE</p>) : (<p>{shipping} MAD</p>)}</div>
                </div>
                <div className=' font-semibold text-xl flex justify-between items-center mt-8'>
                    <div>Total</div>
                    <div className='font-mono'>{(totalAmount + shipping).toFixed(2)} MAD</div> 
                </div>
            </div>
        </div>
    </>
  )
}

export default ChecOutCart
