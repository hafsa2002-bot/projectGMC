import React, {useState, useEffect, useRef} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import SpinnerBlue from '../SpinnerBlue'
import { ArrowLeft, Download } from 'lucide-react'
// import html2pdf from "html2pdf.js";
import { useCart } from '../../CartContext'

function ViewOrder() {
    const {id} = useParams()
    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(true)
    const [productName, setProductName] = useState("")
    const [user, setUser] = useState({})
    const [store, setStore] = useState({})
    const navigate = useNavigate()
    const pdfRef = useRef()
    const {currency} = useCart()
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleGeneratePdf = async () => {
        const element = document.querySelector('#pdf-content')
        html2pdf(element, {
            margin: 5,
            filename: `order.pdf`,
            image: { type: 'jpeg', quality: 1 }, // Higher quality image
            html2canvas: { scale: 3, useCORS: true }, // Increase scale for better resolution
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        
    }

    useEffect(() => {
        axios.get(`${apiUrl}/orders/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }
            }
        )
            .then(response => {
                console.log("Order data: ", response.data);
                setOrder (response.data)
                // getUserDetails(response.data.userId)
                if (response.data.userId) {
                    getUserDetails(response.data.userId);
                } else {
                    console.log('User ID not found in order data.');
                }
                getStoreInfos()
                setLoading(false)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    }, [id])

    const getUserDetails = (id) => {
        axios.get(`${apiUrl}/get-user-byId/${id}`)
            .then(response => setUser(response.data))
            .catch(error => console.log("Error: ", error))
    }

    const getStoreInfos = () => {
        axios.get(`${apiUrl}/store-infos`)
            .then(response => setStore(response.data))
            .catch(error => console.log("Error: ", error))
    }
  return (
    <div>
        
        {
            loading ? (
                <SpinnerBlue/>
            ):(
                <div> 
                    <div className='flex justify-between items-center p-4'>
                        <div onClick={() => navigate("/admin/orders")}  className='flex gap-2 items-center cursor-pointer'>
                            <div><ArrowLeft/></div>
                            <div className='text-xl font-bold'><p>Order #{order._id}</p></div>
                        </div>
                        <div className='flex gap-5'>
                            {/* <Link to={`/admin/update-order/${id}`} className='border border-blue-600 text-blue-600 bg-white px-4 py-1.5 font-semibold text-lg rounded-lg'>
                                <p>Edit order</p>
                            </Link> */}
                            <button onClick={() => handleGeneratePdf()} className='flex cursor-pointer gap-2 justify-center items-center  text-white bg-blue-500 px-4 py-1.5 font-semibold text-lg rounded-lg'>
                                <div><Download /></div>
                                <p>Download PDF</p>
                            </button>
                        </div>
                    </div>
                    <div ref={pdfRef} id="pdf-content"  style={{ backgroundColor: "white", width: "90%", margin: "auto", marginTop: "40px", marginBottom: "40px", paddingBottom: "80px", fontFamily: "roboto"}}>
                        <div style={{ borderBottom: "1px solid #D1D5DB", paddingLeft: "32px", paddingRight: "32px", paddingBottom:"20px", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                            <div style={{ color: "#57534E" }}>
                                <p style={{ color: "#2563EB", fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>Novexa</p>
                                <p> {user && user.name} </p>
                                <div className='flex'>
                                    <div>{store.address && store.address} </div>
                                    <div> {(store.address && store.city) && <div className='mr-1'>, </div>} </div>
                                    <div>{store.city && store.city.charAt(0).toUpperCase() + store.city.slice(1)} </div>
                                </div>
                                <p> {store.country && store.country} </p>
                                <p>{user.email && user.email}</p>
                                <p>{user.phoneNumber && user.phoneNumber}</p>
                            </div>
                            <div>
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}><span style={{ fontWeight: "600" }}>Order number:</span> <p style={{ color: "#4B5563" }}>{order._id}</p></div>
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}><span style={{ fontWeight: "600" }}>Date issued:</span> <p style={{ color: "#4B5563" }}>{order.createdAt.slice(0, 10)}</p></div>
                            </div>
                        </div>
                        <div style={{display: 'flex', gap: '20px', paddingTop: '20px', paddingLeft: "32px", paddingRight: "32px" }}>
                            <div>Customer:</div>
                            <div>
                                {order.shipping && (
                                    <div style={{ color: '#4B5563' }}> {/* text-gray-600 */}
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            {order.shipping.firstName && <p>{order.shipping.firstName}</p>}
                                            {order.shipping.lastName && <p>{order.shipping.lastName}</p>}
                                        </div>
                                        <div>
                                            {order.shipping.address}
                                            {(order.shipping.address && order.shipping.city) && <span>, </span>}
                                            <br />
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                {order.shipping.city && <p>{order.shipping.city},</p>} {order.shipping.postalCode && <p>{order.shipping.postalCode}</p>}
                                            </div>
                                        </div>
                                        <p>{order.contact?.customerMail}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <table style={{ width: '100%', marginTop: '40px', textAlign: 'left'}}>
                                <thead style={{ backgroundColor: '#3B82F6', color: 'white', paddingLeft: '32px'  }}>
                                    <tr>
                                        <th scope="col" style={{ padding: '12px 32px' }}>Item</th>
                                        <th scope="col" style={{ padding: '12px 32px' }}>Quantity</th>
                                        <th scope="col" style={{ padding: '12px 32px' }}>Price</th>
                                        <th scope="col" style={{ padding: '12px 32px' }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {order.products &&
                                        order.products.map((product, index) => (
                                            <tr key={index}>
                                                <td style={{ padding: '12px 32px' }}>{product.name}</td>
                                                <td style={{ padding: '12px 32px' }}>{product.quantity}</td>
                                                <td style={{ padding: '12px 32px' }}>{product.price} {currency}</td>
                                                <td style={{ padding: '12px 32px' }}>{(product.quantity * product.price).toFixed(2)} {currency}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #9CA3AF',
                                borderTop: '1px solid #9CA3AF',
                                padding: '20px 48px',
                                marginTop: '24px'
                            }}>
                                <div style={{ width: '50%' }}></div>
                                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <p>Total ({currency})</p>
                                            <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Excl. Shipping</p>
                                        </div>
                                        <div>{order.totalAmount.toFixed(2)} {currency}</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#374151', fontSize: '0.875rem' }}>
                                        <div><p>Shipping Fee</p></div>
                                        <div><p>{order.shipping.shippingPrice} {currency}</p></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 3rem' }}>
                                <div style={{ width: '50%' }}></div>
                                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <p>Total Due ({currency})</p>
                                        </div>
                                        <div>{(order.totalAmount + order.shipping.shippingPrice).toFixed(2)} {currency} </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1F2937', fontSize: '0.875rem' }}>
                                        <div><p>Paid ({currency})</p></div>
                                        <div><p>{order.amountPaid} {currency} </p></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div><p>Balance ({currency})</p></div>
                                        <div><p>{order.rest.toFixed(2)} {currency} </p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[90%] m-auto border-t-2 border-blue-600 pt-5 pb-14 mt-20 flex justify-center items-center gap-4">
                        <p className='font-medium w-1/2 text-end'>Powered by </p>
                        <div className=" w-1/2 flex gap-2 justify-start items-center">
                            <div className='w-10 h-10 flex justify-center items-center'><img className='w-full' src="/images/newLogo7.png" alt='logo'/></div>
                            <div className='font-poppins text-2xl font-semibold'>Nov<span className='text-blue-600'>exa</span></div>
                        </div>
                    </div>    
                </div>
            )
        }
    </div>
  )
}

export default ViewOrder
