"use client"
import React from 'react'
import Sidebar_com from '../components/Sidebar_com'
import {  useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileBase from 'react-file-base64'
import { add_Category } from '@/app/services'

export default function AddCategory() {
    const [formData, setFormData] = useState({ name: '', slug: '', description: '', featured: false, image: '' })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await add_Category(formData)
        if (res.msg) {
            toast.success(res.msg);
            window.location.reload();
        }
        else {
            toast.error(res.error);
        }
    }




    return (
        <div className='w-full h-screen bg-slate-900 flex'>
            <Sidebar_com />
            <div className='w-10/12 h-full text-white flex flex-col items-center'>
                <div className='w-full p-4  mt-10 mb-4 flex items-center justify-center'>
                    <h1 className='text-4xl font-semibold tracking-widest p-2 uppercase'>Add  Category</h1>
                </div>

                <form className='text-white' onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label for="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Category Name</label>
                        <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Category name" required />
                    </div>
                    <div className="mb-6">
                        <label for="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Category Slug</label>
                        <input onChange={(e) => setFormData({ ...formData, slug: e.target.value })} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required placeholder='Slug' />
                    </div>
                    <div className="mb-6">
                        <label for="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Category Image</label>
                        <FileBase onDone={({ base64 }) => setFormData({ ...formData, image: base64 })} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required placeholder='Slug' />
                    </div>
                    <div className="mb-6">

                        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea onChange={(e) => setFormData({...formData , description   : e.target.value }) } id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Leave a comment..."></textarea>

                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} checked={formData.featured} id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" className="ml-2 text-sm font-medium text-white dark:text-gray-300">Featured Product Category</label>
                    </div>

                    <button type="submit" className="text-white bg-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-600">Submit</button>
                </form>


            </div>
            <ToastContainer />
        </div>
    )
}
