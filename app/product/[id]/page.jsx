
"use client"
import React, { useEffect, useState } from 'react'
import { toast ,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { getOneProductById } from '@/app/services';
import { Navbar, Footer} from '@/app/components'
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/store/Slices/cartSlice';

export default function ProdCard({ params }) {
    const token = Cookies.get('token');
    const [userID, setUserID] = useState(undefined);
    const [product,setProduct] = useState(undefined)
    const dispatch = useDispatch()

    const fetchProductData =async() =>{
        const data = await getOneProductById(params.id);
        console.log('fetching product data')
        if(data){
            setProduct(data)
        }
    }
    useEffect(() => {
        if (token) {
            const getUser = localStorage.getItem('user')
            const user = JSON.parse(getUser);
            setUserID(user._id)
        }
        fetchProductData()
    }, [])

    const AddtoCart = async () => {
      console.log(product,token)
      try{
        if (!token) {
            toast.error('Please login ', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }else{
          if (userID && product) {
            const { _id, name, image, price } = product;
            const data = { productID: _id, productName: name, productImage: image, productPrice: price, user: userID , productQuantity: 1} 
            dispatch(addToCart(data)) 
            toast.success('Product Successfully added to cart')
          } 
        }

        
       }catch(e){
        toast.error(e)
      }
    }

    return (
        <>
        <Navbar pos={"fixed"} />
        <section className="text-gray-700 body-font overflow-hidden bg-white p-10">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img className="mt-10 lg:w-1/2 object-scale-down h-80 w-120 object-center rounded border border-gray-200" src={product?.image}/>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.name}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
               
              </div>
              <p className="leading-relaxed">{product?.description}</p>
             
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">${product?.price}</span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={() =>AddtoCart()}>Add to cart</button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
      <Footer />
        </>
        
    )
}



