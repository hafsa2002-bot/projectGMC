import React, {useState, useEffect, useRef} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import SpinnerBlue from '../SpinnerBlue'
import { ArrowLeft, Download } from 'lucide-react'
import html2pdf from "html2pdf.js";


function ViewOrder() {
    const {id} = useParams()
    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(true)
    const [productName, setProductName] = useState("")
    const navigate = useNavigate()
    const pdfRef = useRef()

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
    /*
    let getProductName = async (productId) => {
        try{
            const response = await axios.get(`http://localhost:3003/admin/items/view/${productId}`)
            return response.data.productName
        }catch(error){
            console.log("Error: ", error)
            return "Unknown Product"
        }
    }
        */
    

    useEffect(() => {
        axios.get(`http://localhost:3003/orders/${id}`)
            .then(response => {
                setOrder (response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    }, [id])

  return (
    <div>
        
        {
            loading ? (
                <SpinnerBlue/>
            ):(
                <div> 
                    <div className='flex justify-between items-center p-4'>
                        <div onClick={() => navigate(-1)}  className='flex gap-2 items-center cursor-pointer'>
                            <div><ArrowLeft/></div>
                            <div className='text-xl font-bold'><p>Order #{order._id}</p></div>
                        </div>
                        <div className='flex gap-5'>
                            <Link className='border border-blue-600 text-blue-600 bg-white px-4 py-1.5 font-semibold text-lg rounded-lg'>
                                <p>Edit order</p>
                            </Link>
                            <button onClick={() => handleGeneratePdf()} className='border flex cursor-pointer gap-2 justify-center items-center border-blue-600 text-white bg-blue-600 px-4 py-1.5 font-semibold text-lg rounded-lg'>
                                <div><Download /></div>
                                <p>Download PDF</p>
                            </button>
                        </div>
                    </div>
                    <div ref={pdfRef} id="pdf-content"  style={{ backgroundColor: "white", width: "90%", margin: "auto", marginTop: "40px", marginBottom: "40px", paddingBottom: "80px", fontFamily: "poppins"}}>
                        <div style={{ borderBottom: "1px solid #D1D5DB", paddingLeft: "32px", paddingRight: "32px", paddingBottom:"20px", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                            <div style={{ color: "#57534E" }}>
                                <p style={{ color: "#2563EB", fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>Novexa</p>
                                <p>Admin Name</p>
                                <p>Address, num x<span>,</span></p>
                                <p>Country</p>
                                <p>admin@gmail.com</p>
                                <p>0000000000</p>
                            </div>
                            <div>
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}><span style={{ fontWeight: "600" }}>Order number:</span> <p style={{ color: "#4B5563" }}>{order._id}</p></div>
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}><span style={{ fontWeight: "600" }}>Date issued:</span> <p style={{ color: "#4B5563" }}>{order.createdAt.slice(0, 10)}</p></div>
                            </div>
                        </div>
                        <div style={{display: 'flex', gap: '20px', paddingTop: '20px', paddingLeft: "32px", paddingRight: "32px" }}>
                            <div>Vendor:</div>
                            <div>
                                {order.shipping && (
                                    <div style={{ color: '#4B5563' }}> {/* text-gray-600 */}
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            {order.shipping.firstName && <p>{order.shipping.firstName}</p>}
                                            {order.shipping.lastName && <p>{order.shipping.lastName}</p>}
                                        </div>
                                        <div>
                                            {order.shipping.address},<br />
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                {order.shipping.city}, {order.shipping.postalCode && <p>{order.shipping.postalCode}</p>}
                                            </div>
                                        </div>
                                        <p>{order.contact?.customerMail}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <table style={{ width: '100%', marginTop: '40px', textAlign: 'left'}}>
                                <thead style={{ backgroundColor: '#2563EB', color: 'white', paddingLeft: '32px'  }}>
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
                                                <td style={{ padding: '12px 32px' }}>{product.price} MAD</td>
                                                <td style={{ padding: '12px 32px' }}>{product.quantity * product.price} MAD</td>
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
                                            <p>Total (MAD)</p>
                                            <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Excl. Shipping</p>
                                        </div>
                                        <div>{order.totalAmount} MAD</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#374151', fontSize: '0.875rem' }}>
                                        <div><p>Shipping Fee</p></div>
                                        <div><p>{order.shipping.shippingPrice} MAD</p></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 3rem' }}>
                                <div style={{ width: '50%' }}></div>
                                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <p>Total Due (MAD)</p>
                                        </div>
                                        <div>{order.totalAmount + order.shipping.shippingPrice} MAD</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1F2937', fontSize: '0.875rem' }}>
                                        <div><p>Paid (MAD)</p></div>
                                        <div><p>{order.amountPaid} MAD</p></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div><p>Balance (MAD)</p></div>
                                        <div><p>{order.rest} MAD</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-10/12 m-auto border-t-2 border-blue-600 pt-5 pb-14 mt-20 flex justify-center items-center gap-4">
                        <p className='font-medium w-1/2 text-end'>Powered by </p>
                        <div className=" w-1/2 flex gap-2 justify-start items-center">
                            <div className='w-11 h-11'><img src="/images/blueLogo.png" alt='logo'/></div>
                            <div className='font-poppins text-lg'><span className='text-blue-600'>Nov</span>exa</div>
                        </div>
                    </div>    
                </div>
            )
        }
    </div>
  )
}

export default ViewOrder
