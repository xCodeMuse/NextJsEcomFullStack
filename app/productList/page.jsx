
"use client"
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { getProductsData } from '@/app/services';
import { Navbar, Footer,ProdCard} from '@/app/components'


export default function Products({ params }) {
    
    const [userID, setUserID] = useState(undefined);
    const [products,setProducts] = useState(undefined)

    const fetchProductData =async() =>{
        const data = await getProductsData();
        if(data){
            setProducts(data)
        }
    }
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const getUser = localStorage.getItem('user')
            const user = JSON.parse(getUser);
            setUserID(user._id)
        }
        fetchProductData()
    }, [])

  

    return (
        <>
        <Navbar pos={"fixed"} />
        <h1 className='p-2 mt-24 mt-2 border-orange-600 text-4xl uppercase  font-bold dark:text-black justify-center text-center'>All Products</h1>
            <div className='w-full h-full mt-12 flex items-center justify-center flex-wrap'>

                {/* card */}
                {
                    products?.map((item) => {
                        return (
                            <ProdCard item={item} key={item._id} />
                        )
                    })
                }
                {/* card */}
                {!products && <><div className='w-72 h-80 bg-gray-200 border border-gray-200 rounded animate-pulse'/><div className='w-72 h-80 mx-4 bg-gray-200 border border-gray-200 rounded animate-pulse'/><div className='w-72 h-80 bg-gray-200 border border-gray-200 rounded animate-pulse'/></> }

            </div>
            <ToastContainer />
        <Footer />
        </>
        
    )
}



