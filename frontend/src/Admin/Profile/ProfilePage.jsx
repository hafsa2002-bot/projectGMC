import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Building2, Camera, KeyRound, UserRound } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

function ProfilePage() {
  return (
    <div className='flex font-poppins min-h-[93vh] bg-white border border-gray-300 rounded-lg'>
        <div className='w-4/12 flex flex-col gap-4  border-r border-gray-300 '>
            <p className='text-3xl font-medium mb-5 pb-2 px-2 mx-6 mt-5 text-blue-500 font-poppins border-b-2 border-blue-500 '>Profile</p>
            <p className='text-gray-600 text-sm px-2 mx-6 -mt-2 mb-4'>
                This page allows you to manage your personal details, change your password, and update your business information.
            </p>        
            <NavLink 
                to="/admin/profile" 
                className={({ isActive }) => `px-4 py-2.5 text-black flex gap-3 items-center mx-5 rounded-lg ${isActive && window.location.pathname === "/admin/profile" ? 'bg-gray-600 text-white' : 'hover:bg-gray-50'}` }
            >
                <UserRound/>
                <p>Personal Information</p>
            </NavLink>
            <NavLink 
                to="/admin/profile/security-settings" 
                className={({ isActive }) => `px-4 py-2.5 text-black flex gap-3 items-center mx-5 rounded-lg ${isActive ? 'bg-gray-600 text-white' : 'hover:bg-gray-50'}` }
            >
                <KeyRound />
                <p>Password / Security Settings</p>
            </NavLink>
            <NavLink 
                to="/admin/profile/business-informations" 
                className={({ isActive }) => `px-4 py-2.5 text-black flex gap-3 items-center mx-5 rounded-lg ${isActive ? 'bg-gray-600 text-white' : 'hover:bg-gray-50'}` }
            >
                <Building2 />
                <p>Business Information</p>
            </NavLink>
        </div>
        <div className='w-10/12'>
            <Outlet/>
        </div>
    </div>
  )
}

export default ProfilePage
