import React from 'react'
import {Search, UserRound, CircleUserRound, House, Ratio, ScanBarcode, ShoppingBag, ShoppingBasket, ChartNoAxesCombined } from 'lucide-react'


function Nav() {
    return (
        <div>
            <nav className='flex justify-between items-center bg-white text-blue-600 py-4 px-6 border-b border-gray-300'>
                <div className='div1_nav flex justify-center gap-6 items-center'>
                    <div className='logoNav gap-1.5 flex justify-center items-center'>
                        <Ratio size = {30}/> 
                        <h2 className='font-bold text-2xl'>Novexa</h2>
                    </div>
                    <div className='flex  gap-1.5  justify-center'>
                        <select className='selectNav border-none bg-transparent text-blue-600 text-lg'>
                            <option value="" disabled selected className=''>Select a category</option>
                        </select>
                    </div>
                </div>
                <div className='searchNav border border-gray-400 justify-center  gap-0 m-0 items-center rounded-xl h-11 flex w-96 overflow-hidden'>
                    <input type="text" name="search" id="search1" placeholder='Search a product' className='border-none  h-full w-full py-0 px-2.5 m-0 outline-none'/>
                    <button className='h-full px-3 border-none flex justify-center items-center bg-slate-100 '> <Search/> </button>
                </div>
                <div className='logInNav flex justify-center w-32 gap-2.5 py-2 px-2 border border-blue-600 rounded-xl items-center overflow-hidden '>{/* items-center  gap-0 */}
                    <div className='profile-img'><UserRound /></div>
                    <a href='' className='no-underline  text-xl font-medium'><p className='text-blue-600'>Log in</p></a>
                </div>
            </nav>


            {/* <div className='footerNav'>
                <div className='div1_footer'>
                    <div className='logoFooter'>
                        <Ratio/> 
                        <h2>Novexa</h2>
                    </div>
                    <div>
                        <select className='selectFooter'>
                            <option value="" disabled selected>Select a category</option>
                        </select>
                    </div>
                </div>
                <div className='searchFooter'>
                    <input type="text" name="search2" id="search2" placeholder='Search a product' />
                    <button> <Search/> </button>
                </div>
                <div className='logInFooter'>
                    <div className='profile-img'><UserRound /></div>
                    <a href=''>Log in</a>
                </div>
            </div> */}
        </div>
    )
}

export default Nav
