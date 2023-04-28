"use client"
import { getCategoriesData, getProductsData } from '@/app/services';
import React,{useState,useEffect} from 'react'
import { Navbar, Categories, Intro, Products, Footer} from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default async function () {
    const categoryData = await getCategoriesData()||[];
    const totalProductData = await getProductsData()||[];
    const filterProduct = totalProductData.filter((item) => {
      return item.featured === true;
    })
    
    const productFiltered = filterProduct.slice(0, 8);
    const [category,product] = await Promise.all([categoryData,productFiltered])
    return (
        <div className='w-full h-screen'>
            <Navbar pos={"fixed"} />
            <Intro />
            <Categories category={category} />
            <Products product={product} />
            <Footer />
            <ToastContainer />
        </div>
    )
}
