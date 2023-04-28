"use client"
import React, { useEffect, useState } from 'react'
import { getCategoriesData, get_Product_By_Category } from '@/app/services';
import { Navbar, Footer, ProdCard } from '@/app/components';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function viewProductByCategories({ params }) {
    const [catName, setCatName] = useState(undefined);
    const [product,setProduct] = useState([])

    const fetchProductsByCat = async() =>{
        const productList = await get_Product_By_Category(params.id);
        
        if(productList.length >0){
            setProduct(productList)
            setCatName(productList[0].category.name);
        }
    }

    useEffect(() => {
        fetchProductsByCat()
    },[])

    return (
        <>
        <div className='w-full flex flex-col '>
            <Navbar pos={"absolute"} />
            <div className="w-full h-full px-4 bg-white py-10 my-24">
                <Link href={'/'} className="my-24 text-indigo-600 border-slate-900 p-2 text-lg font-semibold">Home / {catName}</Link>
                <div className='my-10 mx-4 flex flex-wrap py-4 items-center justify-center'>
                    {
                        product?.map((item) => {
                            return <ProdCard item={item} key={item._id} />
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
        <ToastContainer />
        </>
    )
}

export async function getStaticPaths() {
    const category = await getCategoriesData();
    return {
        paths: category.map((cate) => {
            return {
                params: { id: String(cate._id) }
            }
        }),
        fallback: false,

    }

}



