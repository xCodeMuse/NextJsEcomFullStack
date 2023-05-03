"use client"
import { getCategoriesData, getProductsData } from '@/app/services';
import React, {useState, useEffect} from 'react'
import { Navbar, Categories, Intro, Products, Footer} from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function landingPage () {
    const [category, setCategory] = useState()
    const [products,setProducts] = useState()
    
    const fetchInitalData = async() =>{
        const categoryData = await getCategoriesData()
        const totalProductData = await getProductsData(true)
        
        setCategory(categoryData);
        setProducts(totalProductData)
    }

    useEffect(() =>{
        console.log('landingpage')
        fetchInitalData()
    },[])

    
    return (
        <div className='w-full h-screen'>
            <Navbar pos={"fixed"} />
            <Intro />
            <Categories category={category} />
            <Products product={products} />
            <Footer />
            <ToastContainer />
        </div>
    )
}
