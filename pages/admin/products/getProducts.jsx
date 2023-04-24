import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Sidebar_com from '../components/Sidebar_com'
import { delete_Product, getProductsData } from '@/services/admin'
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';



export async function getStaticProps() {
    const data = await getProductsData() || [];

    return {
        props: { data }
    }

}


export default function getProducts({ data }) {
    const [finalData, setFinalData] = useState(data);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Fetch the updated data from the server
            getProductsData().then((newData) => {
                setFinalData(newData);
            });
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleDelete = async (id) => {
        const data = await delete_Product(id);

        if (data.msg) {
            toast.success(data.msg);
        }
        else {
            toast.error(data.error)
        }
    }

    return (
        <div className='w-full h-screen bg-slate-900 flex'>
            <Sidebar_com />
            <div className='w-10/12 h-full text-white overflow-auto '>
                <div className='w-full p-4  mt-10 mb-4 flex items-center justify-center'>
                    <h1 className='text-4xl font-semibold tracking-widest p-2 uppercase'>Product List</h1>
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
                    {finalData.map((product) => (
                      <tr key={product._id}>
                        <td className="py-0 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            
                          {product._id}
                          </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <div className="text-sm text-center text-gray-900 dark:text-white">
                            {product.name}
                          </div>
                          
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.featured === true ? "YES" : "NO"}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-gray-500 dark:text-gray-300">
                        <Image width={75} height={75} src={product.image} alt="product Image" />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                          
                          <Link href={`updateProducts/${product._id}`} class="bg-indigo-500 mx-2 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full">Update</Link>
                          <button onClick={() => handleDelete(product._id)} class="bg-red-500 mx-2 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full">Delete</button>
                                                        
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
