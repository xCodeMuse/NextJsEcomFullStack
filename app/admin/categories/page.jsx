"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Sidebar_com from '../components/Sidebar_com'
import { deleteCategory, getCategoriesData } from '@/app/services'
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';


export default function categories() {
    const [finalData, setFinalData] = useState([]);
    const [updateListFlag,setUpdateListFlag] = useState(0)
    const loadData = async() =>{
        const data = await getCategoriesData();
        setFinalData(data)
    } 
    useEffect(() =>{
        loadData()
    },[updateListFlag])
   
    const handleDelete = async (id) => {
        
        const data = await deleteCategory(id);
        if (data.msg) {
            setUpdateListFlag(!updateListFlag)
            toast.success(data.msg);
        }
        else {
            toast.error(data.error)
        }
    }

    return (
        <div className='w-full h-screen bg-slate-900 flex  ' >
            <Sidebar_com />
            <div className='w-10/12 h-full text-white overflow-auto '>
                <div className='w-full p-4  mt-10 mb-4 flex items-center justify-center'>
                    <h1 className='text-4xl font-semibold tracking-widest p-2 uppercase'>Categories List</h1>
                </div>
                <div className=' px-10 '>
                <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-0 px-4 text-sm font-normal text-left rtl:text-left text-gray-500 dark:text-gray-400"
                      >
                        <span>Id</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-center rtl:text-center text-gray-500 dark:text-gray-400"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                       Featured Product
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-center text-gray-500 dark:text-gray-400"
                      >
                        Action
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {finalData?.map((category) => (
                      <tr key={category._id}>
                        <td className="py-0 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            
                          {category._id}
                          </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <div className="text-sm text-center text-gray-900 dark:text-white">
                            {category.name}
                          </div>
                          
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {category.featured === true ? "YES" : "NO"}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-gray-500 dark:text-gray-300">
                        <Image width={75} height={75} src={category.image} alt="product Image" />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                          
                          <Link href={`admin/updateCategory/${category._id}`} className="bg-indigo-500 mx-2 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full">Update</Link>
                          <button onClick={() => handleDelete(category._id)} className="bg-red-500 mx-2 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full">Delete</button>
                                                        
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </div>
                

            </div>
            <ToastContainer />
        </div>
    )
}
