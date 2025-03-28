import { ArrowLeft, ChevronDown, CirclePlus, Trash2} from 'lucide-react'
import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ListOfProducts from './ListOfProducts'
import axios from 'axios'
function AddOrder() {
    // const [shipping, setShipping] = useState({})
    const navigate = useNavigate()
    const [rows, setRows] = useState([{id:1, productName: "", quantity: 0, price: 0, subtotal: 0}])
    const [firstName, setFirstName] = useState("")
    const [address, setAddress] = useState("")
    const [showProducts, setShowProducts] = useState(false)
    const [products, setProducts] = useState()
    const [filteredProducts, setFilteredProducts] = useState([])
    const [amountPaid, setAmountPaid] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(0)
    const [lastName, setLastName] = useState("")
    const [selectedProduct, setSelectedProduct] = useState()
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState(0)

    const addNewRow = () => {
        setRows([...rows, {id: rows.length + 1, productId: null , productName: "", quantity: 0, price: 0, subtotal: 0}])
        setFilteredProducts(products)
        console.log("rows = ", rows)
    }
    
    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id))
    }
    
    const getListOfProducts = () => {
        axios.get("http://localhost:3003/admin/items/list")
        .then(response => {
            setProducts(response.data)
            setFilteredProducts(response.data)
        })
        .catch(error => console.log("Error: ", error))
    }
    
    const filterProducts = (name) => {
        const result = products?.filter(product => product.productName.toLowerCase().includes(name.toLowerCase()))
        setFilteredProducts(result)
    }
    
    const calculateTotal = () => {
        const res = rows.reduce((total, row) => total + row.price * row.quantity, 0)
        setTotalAmount(res)
    }
    useEffect(() => {
        calculateTotal()
    }, [rows])

    const submitOrder = (event) => {
        event.preventDefault();

        const orderData = {
            contact: {
                customerMail : "__"
            },
            shipping: {
                firstName: firstName,
                lastName: "__",
                address: address,
                postalCode: "__",
                city: "__",
                phoneNumber: "__",
                shippingPrice: 0,
            },
            products: rows.map(row => ({
                productId: row.productId,
                name: row.productName,
                quantity: row.quantity,
                price: row.price,
            })),
            totalAmount: totalAmount,
            amountPaid: amountPaid,
            status: "done"
        }
        axios.post('http://localhost:3003/orders/addOnlineOrder', orderData)
            .then(response => {
                console.log("order submitted successfully", response.data)
                navigate("/admin/orders")
            })
            .catch(error => console.log("error submitting order", error))
    }

    useEffect(() => {
        getListOfProducts();  
    }, []);  


  return (
    <div className='my-3'>
        <div className='flex mb-10'>
            <Link to="/admin/orders" className='flex gap-2 items-center'>
                <div><ArrowLeft className='text-gray-600 '/></div>
            </Link>
            <div className='text-2xl text-gray-600 pl-2 font-semibold font-poppins'><p>Add New Item</p></div>
        </div>
        <div className='bg-white p-5 mt-5 rounded-lg mb-24'>
            <div className='mb-3'>
                <p className='text-xl font-semibold'>Order Details</p>
                <p className='text-gray-600 text-sm mt-1'>Fill in your purchase order details </p>
            </div>
            <form onSubmit={submitOrder}>
                {/* customer info */}
                <div className='flex gap-10 mt-7'>
                    <div className='w-1/2 flex flex-col '>
                        <label htmlFor="firstName" className='font-medium text-gray-900 mb-2' >Customer name</label>
                        <input 
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text" 
                            name="firstName" 
                            id="firstName"
                        />
                    </div>
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="address" className='font-medium text-gray-900 mb-2' >Delivery address</label>
                        <input 
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text" 
                            name="address" 
                            id="address"
                        />
                    </div>
                </div>
                {/* shipping fees */}
                <div className='flex gap-10 mt-5'>
                    {/*
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="shippingPrice" className='font-medium text-gray-900 mb-2' >Shipping fees</label>
                        <input 
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                            value={shippingPrice}
                            onChange={(e) => setShippingPrice(e.target.value)}
                            type="text" 
                            name="shippingPrice" 
                            id="shippingPrice"
                        />
                    </div>
                    <div className='w-1/2'></div>
                    */}
                </div> 
                {/* order array */}
                <div className='w-full border border-gray-300 rounded-lg overflow-hidden mt-10 '>
                    <table className='w-full'>
                        <thead className='py-2 bg-gray-100 font-semibold text-left border-b border-gray-300'>
                            <tr>
                                <th scope="col" className="px-6 py-3 border-r border-gray-300">#</th>
                                <th scope="col" className="px-6 py-3 border-r border-gray-300">Item Name</th>
                                <th scope="col" className="px-6 py-3 border-r border-gray-300">Quantity</th>
                                <th scope="col" className="px-6 py-3 border-r border-gray-300">Price</th>
                                <th scope="col" className="px-6 py-3 border-r border-gray-300">Subtotal</th>
                                <th scope="col" className="px-2 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows?.map((row, index) => (
                                <tr key={row.id} className='border-b border-gray-300'>
                                    <td className="px-6 py-3 border-r border-gray-300">{index+1}</td>
                                    {/* select product name */}
                                    <td className="px-6 py-3 border-r border-gray-300">
                                        <div 
                                            className={` flex justify-between  border  text-gray-900 text-sm rounded-lg w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                                        >
                                            <input
                                                className='outline-none'                            
                                                type="text" name="" id="" placeholder={showProducts === index ? 'Start typing to filter' : 'Select an item' }
                                                value={row.productName}
                                                onChange={(e) => {
                                                    const newRows = [...rows]
                                                    newRows[index].productName = e.target.value
                                                    setRows(newRows)
                                                    if (e.target.value !== "") {
                                                        setShowProducts(index);
                                                        filterProducts(e.target.value);
                                                        // console.log("hi filter")
                                                    } else {
                                                        setFilteredProducts(products);
                                                        getListOfProducts()
                                                    }
                                                }}
                                            />
                                            {
                                                showProducts === index 
                                                ? (<ChevronDown  className='rotate-180 cursor-pointer' onClick={() => setShowProducts(false)}/>)
                                                : (<ChevronDown  className='cursor-pointer'  onClick={() => setShowProducts(index)}/>)
                                            }
                                            
                                        </div>
                                        {showProducts === index && (
                                            <div className='absolute z-20 w-56 ml-1 max-h-48 bg-white border border-gray-300 rounded-lg mt-1 overflow-y-scroll'>
                                                {/* <ListOfProducts products={filteredProducts} setSelectedProduct={setSelectedProduct} setProductName={setProductName} setShowProducts={setShowProducts}  /> */}
                                                <ListOfProducts 
                                                    products={filteredProducts} 
                                                    setSelectedProduct={(product) => {
                                                        const newRows = [...rows];
                                                        newRows[index].productName = product.productName;
                                                        newRows[index].price = product.price; // Assuming `price` is available in `product`
                                                        newRows[index].productId = product._id
                                                        setRows(newRows);
                                                    }} 
                                                    setProductName={(name) => {
                                                        const newRows = [...rows];
                                                        newRows[index].productName = name;
                                                        setRows(newRows);
                                                    }} 
                                                    setShowProducts={setShowProducts}   
                                                />
                                            </div>
                                        )}
                                    </td>
                                    {/* quantity */}
                                    <td className="px-6 py-3 border-r border-gray-300">
                                        <div>
                                            <input 
                                                className={` flex justify-between border  text-gray-900 text-sm rounded-lg w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   } 
                                                type="number" name="quantity" id="quantity"
                                                value={row.quantity}
                                                onChange={(e) => {
                                                    const newRows = [...rows]
                                                    newRows[index].quantity = e.target.value
                                                    newRows[index].subtotal = newRows[index].quantity * newRows[index].price
                                                    setRows(newRows)
                                                }}
                                            />
                                        </div>
                                    </td>
                                    {/* price */}
                                    <td className="px-6 py-3 border-r border-gray-300">
                                        <input 
                                            className={` flex justify-between bg-gray-50 border  text-gray-900 text-sm rounded-lg w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   } 
                                            type="number" name="" id=""  min="1"
                                            // placeholder={selectedProduct?.price}
                                            value={row.price}
                                            disabled
                                        />
                                    </td>
                                    {/* subtotal */}
                                    <td className="px-6 py-3 border-r border-gray-300">
                                        <input 
                                            className={` flex justify-between bg-gray-50 border  text-gray-900 text-sm rounded-lg w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   } 
                                            type="number" name="" id=""
                                            value={row.subtotal}
                                            disabled 
                                        />
                                    </td>
                                    {/* delete row */}
                                    <td className="px-2 py-3">
                                        <Trash2 
                                            className='text-gray-500'
                                            onClick={() => removeRow(row.id)} 
                                        />
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
                {/* add new line */}
                <div 
                    className='text-blue-600 flex items-center gap-2 font-medium mt-4'
                    onClick={addNewRow}
                >
                    <CirclePlus size={20} /><p>Add new line</p> 
                </div>
                <div className='text-xl w-full mt-7'>
                    <div className='w-full flex text-lg py-4 justify-between border-b border-gray-300'>
                        <p>Total (MAD)</p>
                        <p>{totalAmount}</p>
                    </div>
                    {/* <div className='w-full flex py-4 text-base text-gray-600 justify-between border-b border-gray-300'>
                        <p>Shipping Fees (MAD)</p>
                        <p>{shippingPrice}</p>
                    </div> */}
                    {/* <div className='w-full flex py-4 justify-between border-b border-gray-300'>
                        <p>Total Due (MAD)</p>
                        <p>{totalAmount + shippingPrice}</p>
                    </div> */}
                    <div className='w-full flex py-4 justify-between items-center border-b text-gray-600 text-base border-gray-300'>
                        <p>Amount Paid (MAD)</p>
                        <input 
                            className={` flex justify-between bg-gray-50 border  text-gray-900 text-sm rounded-lg  p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   } 
                            type="number" name="AmountPaid" id="AmountPaid"
                            value={amountPaid}
                            onChange={(e) => setAmountPaid(e.target.value)}
                        />
                    </div>
                    <div className='w-full flex py-4 justify-between border-b border-gray-300'>
                        <p>Rest (MAD)</p>
                        <p>{totalAmount-amountPaid}</p>
                    </div>
                </div>
                <div className='py-5 flex  gap-4 items-center'>
                    <button className='bg-blue-600 text-white px-5 py-2 rounded-lg text-lg font-medium'>Save Order</button>
                    <div onClick={() => navigate(-1)} className='text-red-600 font-medium'>Cancel</div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddOrder
