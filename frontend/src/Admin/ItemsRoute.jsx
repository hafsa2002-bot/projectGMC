import React from 'react'
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom'

function ItemsRoute() {
  const location = useLocation()

  return (
    <div>
      <div className=' bg-gray-100 border-b border-gray-400 flex justify-between items-center my-5 '>
        <div className='flex  gap-5 text-2xl '>
            <NavLink
              className={({isActive}) => (isActive && (window.location.pathname === "/admin/items" || window.location.pathname === "/admin/items/add-item" )) ? 'text-blue-600 border-b-3 border-blue-700 pb-5 font-semibold px-3 ' : 'px-2 text-gray-500 font-semibold'} 
              to="/admin/items">
              <p>Items</p>
            </NavLink>
            <NavLink
              className={({isActive}) => isActive ? 'text-blue-600 font-semibold border-b-3 border-blue-700 pb-5 px-3' : 'text-gray-500 px-2 font-semibold'}
              to="/admin/items/categories">
              <p>Categories</p>
            </NavLink>
        </div>
        <div className='flex text-white gap-4 pb-3'>
            {location.pathname === "/admin/items" && (
                <Link to="/admin/items/add-item" className='bg-blue-600 px-3 py-2 rounded-xl font-semibold'>
                    <p>Add Item</p>
                </Link>
              )}
            {location.pathname === "/admin/items/categories" && (
              <div className='cursor-pointer bg-blue-600 px-3 py-2 rounded-xl font-semibold '>
                  <p>Add Category</p>
              </div>
            )}
        </div>
      </div>
      <Outlet/>
    </div>
  )
}

export default ItemsRoute
