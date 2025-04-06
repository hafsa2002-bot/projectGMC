import React, { useState } from 'react'
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom'
import AddCategory from './AddCategory'

function ItemsRoute() {
  const location = useLocation()
  const [addCategory, setAddCategory] = useState(false)

  return (
    <div>
    { (!location.pathname.startsWith("/admin/items/view")) && (
      <div className={`${(location.pathname == "/admin/items/out-of-stock" || location.pathname == "/admin/items/low-in-stock" || location.pathname == "/admin/items/expired-items" || location.pathname === "/admin/items/add-item" || location.pathname.startsWith("/admin/items/update-item" )) ? 'hidden' :' bg-gray-100 border-b border-gray-400 flex justify-between items-center my-5 '}`} >
        <div className='flex  gap-5 text-2xl '>
            <NavLink
              className={({isActive}) => (isActive && (location.pathname === "/admin/items" )) ? 'text-blue-600 border-b-3 border-blue-700 pb-5 font-semibold px-3 ' : 'px-2 text-gray-500 font-semibold' } 
              to="/admin/items">
              <p>Items</p>
            </NavLink>
            <NavLink
              className={({isActive}) => {
                const isCategoryPage = location.pathname.startsWith("/admin/items/categories");
                return isActive || isCategoryPage
              ? 'text-blue-600 font-semibold border-b-3 border-blue-700 pb-5 px-3' 
              : 'text-gray-500 px-2 font-semibold'}}
              to="/admin/items/categories">
              <p>Categories</p>
            </NavLink>
        </div>
        <div className='flex  gap-4 pb-3'>
            {location.pathname === "/admin/items" && (
              <Link to="/admin/items/add-item" className='text-white bg-blue-600 px-3 py-2 rounded-xl font-semibold'>
                <p>Add Item</p>
              </Link>
              )}
            {location.pathname === "/admin/items/categories" && (
              <Link 
              // to="/admin/items/add-category"
              onClick={() => setAddCategory(true)}
              className='text-white cursor-pointer bg-blue-600 px-3 py-2 rounded-xl font-semibold '>
                  <p>Add Category</p>
              </Link>
            )}
              {addCategory && 
                <AddCategory setAddCategory={setAddCategory}/>
              }
        </div>
      </div>
    )}
      <Outlet/>
    </div>
  )
}

export default ItemsRoute
