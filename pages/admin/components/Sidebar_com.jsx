import React, { useEffect } from 'react'
import { MdOutlineDashboard, MdPendingActions } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { IoMdAddCircle } from 'react-icons/io'
import { HiUserGroup } from 'react-icons/hi'
import { BiCategory } from 'react-icons/bi'
import { CiLogout } from 'react-icons/ci'
import { CiDeliveryTruck } from 'react-icons/ci'
import Router from 'next/router'
import Cookies from 'js-cookie'


export default function Sidebar_com() {

    // logout function
    const logout = () => {
        Cookies.remove('token')
        localStorage.removeItem('user')
        localStorage.clear;
        window.location.reload();
    }

    const token = Cookies.get('token');

    // if token is not present then redirect to login page else store the user data in a variable
    useEffect(() => {
        if (!token) {
            Router.push('/login')
        }
        else {
            const user = localStorage.getItem('user');
            const data = JSON.parse(user);
            if (data.isAdmin === false) {
                toast.error('You are not allowed to access this page');
                Router.push('/frontend/home');
            }
        }


    }, [])

    return (
       <>
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r dark:bg-gray-900 dark:border-gray-700">
      <a className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300"
            href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#4F46E5"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          />
          <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
        </svg>
       <p className="mx-4"> Admin Dashboard </p>
      </a>
      <div className="flex flex-col mt-6">
        <nav className="flex-1 -mx-3 space-y-3 ">
          <a
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            onClick={() => Router.push('/admin/User')}
          >
            <HiUserGroup className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Registered users</span>
          </a>
          <a
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            onClick={() => Router.push('/admin/products/addProduct')} 
          >
            <IoMdAddCircle className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Add New Product</span>
          </a>
          <a
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            onClick={() => Router.push('/admin/products/getProducts')}
          >
            <BiCategory className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Product List</span>
          </a>
          <a
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            onClick={() => Router.push('/admin/addCategory')}
          >
            <IoMdAddCircle className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Add New Category</span>
          </a>

          <a
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            onClick={() => Router.push('/admin/categories')}
          >
            <BiCategory className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Category List</span>
          </a>
          
            <a
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              onClick={() => Router.push('/admin/dashboard')}
            >
              <CgProfile className="w-5 h-5" />
              <span className="mx-2 text-sm font-medium">Profile</span>
            </a>
        </nav>
        
          <nav className="flex-1 -mx-3 space-y-3 mt-6">
           
            <a
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              onClick={logout}
            >
              <CiLogout className="w-5 h-5" />
              <span className="mx-2 text-sm font-medium">Logout</span>
            </a>
          </nav>
        </div>
    </aside>
        </>
    )
}
