import { ImageOff, ChevronDown } from 'lucide-react'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useCart } from '../../CartContext'

function PhoneCheckOut({cart, totalAmount, totalQty}) {
    const [shipping, setShipping] = useState(40)
    const [showOrderDetails, setShowOrderDetails] = useState(false)
    const [outOfStockProducts, setOutOfStockProducts] = useState([])
    const [productById, setProductById] = useState({})
    const {currency} = useCart()
    const chechIfOutOfStock = (productId) => {
        axios.get(`http://localhost:3003/admin/items/view/${productId}`)
            .then(response => {
                setProductById(response.data)
                if(response.data.qty === 0){
                    setOutOfStockProducts(prevState => [...prevState, productId])
                }
            })
            .catch(error => console.log("error: ", error))
    }
    useEffect(() => {
        cart.forEach(item => chechIfOutOfStock(item._id))
    }, [])
  return (
    <div className='lg:hidden w-full mx-auto mb-16 '>
        <div className='flex justify-between items-center m-auto mb-5'>
            <p className='font-semibold text-lg'>Récapitulatif de la commande</p>
            <div 
                className='flex items-center text-gray-500 text-sm'
                onClick={() => setShowOrderDetails(!showOrderDetails)}
            >Afficher <ChevronDown size={15}/></div>
        </div>
        {
            showOrderDetails && (
                <div className='mt-5'>
                    {
                    cart.map((product, index) => (
                        <div key={index} className='flex items-start justify-between w-full  '>
                            <div className='flex items-center gap-2 w-9/12 mb-4 '>
                                <div className='relative w-16 h-16 border border-gray-300 rounded-lg'>
                                    {
                                        product.productPhoto 
                                        ?(
                                            <img className='w-full h-full ' src={`http://localhost:3003${product.productPhoto}`} alt="" />
                                        ):(
                                            <div className='w-full h-full  text-gray-700 flex justify-center items-center'><ImageOff /></div>
                                        )
                                    }
                                    <div className='absolute -top-1 -right-1 w-5 h-5 bg-gray-700 flex justify-center items-center rounded-full text-white'>
                                        {product.quantity}
                                    </div>
                                </div>
                                <div className='w-8/12'>
                                    <p>{product.productName}</p>
                                    {outOfStockProducts.includes(product._id) && (<p className='text-white bg-gradient-to-r from-red-700  to-red-800 rounded-full text-sm w-24 text-center mt-1'>Rupture de stock !</p>)}                            
                                </div>
                            </div>
                            <div className=' font-mono mt-2 '>
                                <span>{product.price}</span> {currency}
                            </div>
                        </div>
                    ))
                }
                </div>
            )
        }
        <div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-1'>
                    <p>Sous-total </p>
                    <span className='border rounded-full p-[0.5px] bg-black'></span>
                    <p>{totalQty == 1 ? <span> {totalQty} Article</span> : <span> {totalQty} Articles</span>} </p> 
                </div>
                <div className=''>{totalAmount} {currency}</div> 
            </div>
            <div className='flex justify-between mt-2'>
                <div>Livraison</div>
                <div>{shipping == 0 ? (<p>FREE</p>) : (<p>{shipping} {currency}</p>)}</div>
            </div>
            <div className=' font-semibold text-xl flex justify-between items-center mt-8'>
                <div>Total</div>
                <div className='font-mono'>{totalAmount + shipping} {currency}</div> 
            </div>
            <button  className='bg-black font-semibold px-2.5 py-3 flex justify-between items-center  border mt-3  text-white text-lg rounded-lg  w-full text-center'>
                <p className=' w-full'>Confirmer la commande</p> 
            </button>
        </div>
    </div>
  )
}

export default PhoneCheckOut
