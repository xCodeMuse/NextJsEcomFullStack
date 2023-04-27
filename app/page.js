import { getCategoriesData, getProductsData } from '@/app/services';
import React from 'react'
import {Navbar,Categories,Intro,Products,Footer} from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export async function getStaticProps() {

    const category = await getCategoriesData() || [];
    const totalProduct = await getProductsData() || [];

    // filtering featured products
    const filterProduct = totalProduct.filter((item) => {
        return item.featured === true;
    })
    
    // 
    const product = filterProduct.slice(0, 8);


    return {
        props: { category, product }

    }

}


export default function Landing({ category, product }) {
    
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
